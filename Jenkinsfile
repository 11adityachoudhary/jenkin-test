pipeline {
    agent any 
    environment {
        //once you sign up for Docker hub, use that user_id here
        dockerImage = ''
        registry = "11adityachoudhary/node_app"
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
   stage('Stop and Remove Existing Container') {
        steps {
            script {
                    // Define the name of the existing container to stop and remove
                    def existingContainerName = registry

                    // Stop and remove the existing container
                    sh "docker stop $existingContainerName || true"
                    sh "docker rm $existingContainerName || true"
            }
        }
    }    
    stage('Docker Run') {
       steps{
         script {
                sh 'docker run -d -p 3000:3000 --name node-container ' + registry 
            }
         }
      }    
    }
}
