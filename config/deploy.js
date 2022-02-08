const gcsServiceAccountCredsPath = 'gcs-service-account-creds';
const gcsServiceAccountCreds = require('./' + gcsServiceAccountCredsPath);

const projectId = 'mamiller93';
const bucketName = 'randomcodeword-deployment-assets';

module.exports = function (deployTarget) {
  const ENV = {
    build: {
      environment: deployTarget,
    },
    'revision-data': {
      type: 'git-commit',
    },
    pipeline: {
      activateOnDeploy: true,
    },
  };

  ENV['gcloud-storage'] = {
    credentials: {
      private_key: gcsServiceAccountCreds.private_key,
      client_email: gcsServiceAccountCreds.client_email,
    },
    projectId: projectId,
  };

  ENV['gcs-index'] = {
    allowOverwrite: true,
    projectId: projectId,
    keyFilename: 'config/' + gcsServiceAccountCredsPath + '.json',
  };

  // if (deployTarget === 'development') {
  // }

  // if (deployTarget === 'staging') {
  //   ENV.prependToFingerprint = 'https://storage.googleapis.com/' + bucket + '/';
  //   ENV['gcloud-storage'].bucket = bucketName;
  //   ENV['gcs-index'].bucket = bucketName;
  // }

  if (deployTarget === 'production') {
    ENV.prependToFingerprint =
      'https://storage.googleapis.com/' + bucketName + '/';
    ENV['gcloud-storage'].bucket = bucketName;
    ENV['gcs-index'].bucket = bucketName;
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
