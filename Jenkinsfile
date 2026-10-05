pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('app') {
                    sh 'npm ci'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('app') {
                    sh 'npm test -- --runInBand'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t kubernetes-cicd-app:${BUILD_NUMBER} .'
            }
        }
    }

    post {
        success {
            echo 'CI Pipeline completed successfully.'
        }

        failure {
            echo 'CI Pipeline failed.'
        }
    }
}
