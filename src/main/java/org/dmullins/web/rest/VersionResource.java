package org.dmullins.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.dmullins.domain.Version;
import org.dmullins.repository.VersionRepository;
import org.dmullins.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Version.
 */
@RestController
@RequestMapping("/api")
public class VersionResource {

    private final Logger log = LoggerFactory.getLogger(VersionResource.class);
        
    @Inject
    private VersionRepository versionRepository;
    
    /**
     * POST  /versions -> Create a new version.
     */
    @RequestMapping(value = "/versions",
        method = RequestMethod.POST,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Version> createVersion(@RequestBody Version version) throws URISyntaxException {
        log.debug("REST request to save Version : {}", version);
        if (version.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("version", "idexists", "A new version cannot already have an ID")).body(null);
        }
        Version result = versionRepository.save(version);
        return ResponseEntity.created(new URI("/api/versions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("version", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /versions -> Updates an existing version.
     */
    @RequestMapping(value = "/versions",
        method = RequestMethod.PUT,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Version> updateVersion(@RequestBody Version version) throws URISyntaxException {
        log.debug("REST request to update Version : {}", version);
        if (version.getId() == null) {
            return createVersion(version);
        }
        Version result = versionRepository.save(version);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("version", version.getId().toString()))
            .body(result);
    }

    /**
     * GET  /versions -> get all the versions.
     */
    @RequestMapping(value = "/versions",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Version> getAllVersions() {
        log.debug("REST request to get all Versions");
        return versionRepository.findAll();
            }

    /**
     * GET  /versions/:id -> get the "id" version.
     */
    @RequestMapping(value = "/versions/{id}",
        method = RequestMethod.GET,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Version> getVersion(@PathVariable Long id) {
        log.debug("REST request to get Version : {}", id);
        Version version = versionRepository.findOne(id);
        return Optional.ofNullable(version)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /versions/:id -> delete the "id" version.
     */
    @RequestMapping(value = "/versions/{id}",
        method = RequestMethod.DELETE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<Void> deleteVersion(@PathVariable Long id) {
        log.debug("REST request to delete Version : {}", id);
        versionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("version", id.toString())).build();
    }
}
