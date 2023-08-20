pipeline {
    agent any 
    environment {
        //once you sign up for Docker hub, use that user_id ere
        dockerImage = ''
        registry = "11adityachoudhary/node-app"
        //- update your credentials ID after creating credentials for connecting to Docker Hub
        registryCredential = 'docker_id'
    }
    
    stages {
        
    
    // Building Docker images
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build registry
        }
      }
    }
    
     // Uploading Docker images into Docker Hub
    stage('Upload Image') {
     steps{    
         script {
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
            }
        }
      }
    }
    }
}
