pipeline {
   agent any
   tools {
     
        nodejs "nodejs"
    }
     environment {
        GCP_SERVICE_ACCOUNT_KEY = credentials('gcp-service-account-key')
         GOOGLE_PROJECT_ID = 'solid-authority-374614';
          CONTAINER_IMAGE = "gcr.io/${GOOGLE_PROJECT_ID}/darkroom-latest"
          SLACK_ID = credentials('SlackCredential')

    }
    stages {
        stage ('clone repository') {
            steps {
                git 'https://github.com/23po/gallery.git'
            } 
        }
        
        stage ('download deps') {
            steps {
               sh 'npm install'
            }
        }
        
        stage ('build') {
            steps {
                sh 'gcloud auth configure-docker'
                sh "docker build -t $CONTAINER_IMAGE ."
                    sh "docker push $CONTAINER_IMAGE"
                }
            } 
            
        stage ('tests') {
            steps {
                sh """
                 
                 git config user.name "23po"
                 git config user.email "ckodalo@gmail.com"

                 git merge -s recursive -X ours origin/test
                 
                 npm install
                 
                 npm test

                
                """
            }

               post {
        failure {
            emailext attachLog: true, 
                body:
                    """
                    <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                    <p>
                    View console output at 
                    "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                    </p> 
                      <p><i>(Build log is attached.)</i></p>
                    """,
                subject: "Status: FAILURE -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                to: 'ckodalo@gmail.com'
        }
     }
            
         
        }    
        
        stage('Authenticate with Google Cloud') {
            steps {
                  echo 'Authenticating with Google Cloud using the service account key'
                script {
                    withCredentials([file(credentialsId: 'gcp-service-account-key', variable: 'GCP_SERVICE_ACCOUNT_KEY')]) {
                        env.GOOGLE_APPLICATION_CREDENTIALS = GCP_SERVICE_ACCOUNT_KEY
                    }
                }
            }
            
        }
        
        stage ('deploy to Cloud run') {
            steps {
           sh """
					#!/bin/bash 
					echo "deploy stage";
					gcloud run deploy gallery --image=$CONTAINER_IMAGE --platform=managed --region=us-central1
					echo "Deployed to GCP";
				"""
				
				  slackSend(
            color: 'good', 
            message: "Deployment successful! Build ID: ${currentBuild.number}\nApp URL: https://gallery-b5aiae2dnq-uc.a.run.app/"
        )
            }
        }
    }

     post {
        success {
            emailext attachLog: true, 
                body:
                    """
                    <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                    <p>
                    View console output at 
                    "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                    </p> 
                      <p><i>(Build log is attached.)</i></p>
                    """,
                subject: "Status: 'SUCCESS' -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                to: 'ckodalo@gmail.com'
        }
        failure {
            emailext attachLog: true, 
                body:
                    """
                    <p>EXECUTED: Job <b>\'${env.JOB_NAME}:${env.BUILD_NUMBER})\'</b></p>
                    <p>
                    View console output at 
                    "<a href="${env.BUILD_URL}">${env.JOB_NAME}:${env.BUILD_NUMBER}</a>"
                    </p> 
                      <p><i>(Build log is attached.)</i></p>
                    """,
                subject: "Status: FAILURE -Job \'${env.JOB_NAME}:${env.BUILD_NUMBER}\'", 
                to: 'ckodalo@gmail.com'
        }
     }
}