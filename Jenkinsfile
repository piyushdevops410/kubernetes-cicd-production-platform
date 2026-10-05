pipeline {
    agent any

    environment {
        AWS_REGION = 'us-east-1'
        ECR_REGISTRY = '889038136848.dkr.ecr.us-east-1.amazonaws.com'
        ECR_REPOSITORY = 'kubernetes-cicd-production-platform'
        IMAGE_NAME = 'kubernetes-cicd-app'
        IMAGE_TAG = "${BUILD_NUMBER}"

        K8S_NAMESPACE = 'kubernetes-cicd'
        K8S_DEPLOYMENT = 'kubernetes-cicd-app'
    }

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

        stage('Push Image to ECR') {
            steps {
                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'jenkins-ecr-user']
                ]) {
                    sh '''
                        aws ecr get-login-password \
                        --region ${AWS_REGION} | \
                        docker login \
                        --username AWS \
                        --password-stdin ${ECR_REGISTRY}

                        docker tag \
                        ${IMAGE_NAME}:${IMAGE_TAG} \
                        ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}

                        docker push \
                        ${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                    kubectl -n ${K8S_NAMESPACE} set image \
                    deployment/${K8S_DEPLOYMENT} \
                    ${IMAGE_NAME}=${ECR_REGISTRY}/${ECR_REPOSITORY}:${IMAGE_TAG}
                '''
            }
        }

        stage('Kubernetes Rollout Validation') {
            steps {
                sh '''
                    kubectl rollout status \
                    deployment/${K8S_DEPLOYMENT} \
                    -n ${K8S_NAMESPACE} \
                    --timeout=180s

                    kubectl get deployment \
                    ${K8S_DEPLOYMENT} \
                    -n ${K8S_NAMESPACE}

                    kubectl get pods \
                    -n ${K8S_NAMESPACE} \
                    -l app=${IMAGE_NAME}
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully.'
        }

        failure {
            echo 'CI/CD Pipeline failed.'
        }
    }
}
