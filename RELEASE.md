<div align="center">
  <h1>
    Releases
  </h1>
</div>

Releases are handled via TravisCI. When a release tag is pushed, Travis automatically initiates a build which, if successful, runs `publish.js` and executes a release to NPM. To make a release, simply bump the project, push a release tag with the desired version, and monitor the Travis build to ensure the release completes.
