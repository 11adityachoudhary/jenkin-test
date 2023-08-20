pipeline {
    environment{
    CONTAINER_NAME = "hello-world"
}   
    agent any

    stages {
        stage('Build & Test') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'docker login -u $USERNAME -p $PASSWORD'
                        sh 'docker build . -t $USERNAME/$CONTAINER_NAME:latest'
                    }
                }
            }
        }
        
        stage('Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'docker push $USERNAME/$CONTAINER_NAME:latest'
                    }
                }
            }
        }
        
      // This stage attempts to stop a Docker container with the name '$CONTAINER_NAME' to avoid conflicts when trying to run containers on the same port.
       stage('stop container') {
            steps {
                script {
              sh '''#!/bin/bash
                    containerName=$(docker ps -a --format '{{.Names}}' | grep -w "$CONTAINER_NAME")

                    echo "Container Names: $containerName"

                    if [ ! -z "$containerName" ]; then
                        docker stop "$containerName"
                        docker rename "$containerName" "$CONTAINER_NAME$BUILD_NUMBER"
                    else 
                        echo 'Container does not exist'    
                    fi
                 '''
                }
            }
        }
  

        stage('Deploy') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh 'docker run -d -p 3000:3000 --name $CONTAINER_NAME $USERNAME/$CONTAINER_NAME:latest'
                    }
            }
        }
     }
   }
}
