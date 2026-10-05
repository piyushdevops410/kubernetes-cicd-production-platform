# Kubernetes CI/CD Production Platform

A hands-on DevOps project that demonstrates a complete CI/CD workflow for deploying a Node.js application to Kubernetes.

The project covers the flow from source code and automated testing to Docker image creation, Amazon ECR, Jenkins-based CI/CD, Kubernetes deployment, and application monitoring with Prometheus and Grafana.

## Project Overview

The application is a small Node.js service running inside Kubernetes.

The main goal of this project is to practice how the different DevOps tools work together in a production-style deployment workflow.

### CI/CD Flow

```text
Developer
   |
   v
GitHub
   |
   v
Jenkins
   |
   +--> Run Tests
   |
   +--> Build Docker Image
   |
   +--> Push Image to Amazon ECR
   |
   v
Kubernetes
   |
   +--> Deployment
   |
   +--> 3 Application Pods
   |
   +--> NodePort Service
   |
   v
Application
```

### Monitoring Flow

```text
Kubernetes
     |
     v
Kube State Metrics
     |
     v
Prometheus
     |
     v
Grafana
```

## Technologies Used

* Git and GitHub
* Jenkins
* Node.js
* Jest
* Docker
* Amazon ECR
* Kubernetes
* Minikube
* Prometheus
* Grafana
* Kube State Metrics
* Linux
* Bash

## Application

The application provides a few simple endpoints for checking the deployment.

```text
/health
/version
```

Example:

```bash
curl http://localhost:3002/health
```

Response:

```json
{
  "status": "UP",
  "application": "kubernetes-cicd-app"
}
```

Version check:

```bash
curl http://localhost:3002/version
```

Response:

```json
{
  "version": "1.0.0"
}
```

## Docker

The application is packaged as a Docker image before it is deployed.

The Docker image uses Node.js Alpine as the base image and runs the application as a non-root user.

Example image:

```text
kubernetes-cicd-production-platform:7
```

## Kubernetes

The Kubernetes configuration is maintained under the `k8s/` directory.

```text
k8s/
├── namespace.yaml
├── deployment.yaml
├── service.yaml
├── configmap.yaml
└── secret.yaml
```

The application runs in the following namespace:

```text
kubernetes-cicd
```

The deployment runs three replicas:

```text
kubernetes-cicd-app
├── Pod 1
├── Pod 2
└── Pod 3
```

Current deployment can be checked with:

```bash
kubectl get deployment kubernetes-cicd-app -n kubernetes-cicd
```

Pods:

```bash
kubectl get pods -n kubernetes-cicd
```

## Amazon ECR

Docker images are pushed to Amazon ECR and Kubernetes pulls the image from the ECR repository.

Example:

```text
889038136848.dkr.ecr.us-east-1.amazonaws.com/kubernetes-cicd-production-platform
```

The deployment process validates that the image is successfully available and running inside Kubernetes.

## Jenkins Pipeline

The Jenkins pipeline is defined in:

```text
Jenkinsfile
```

The pipeline includes the following main stages:

```text
Checkout
   ↓
Install Dependencies
   ↓
Run Tests
   ↓
Docker Build
   ↓
Trivy Scan
   ↓
ECR Login
   ↓
Push Docker Image
   ↓
Kubernetes Deployment
   ↓
Deployment Validation
```

A successful pipeline verifies that the new image is deployed and that the expected Kubernetes replicas are available.

## Testing

Jest is used for application testing.

Tests can be run locally with:

```bash
npm test
```

The CI pipeline also runs the tests before continuing with the Docker build and deployment stages.

## Kubernetes Validation

After deployment, the application can be verified using:

```bash
kubectl get deployment -n kubernetes-cicd
kubectl get pods -n kubernetes-cicd
kubectl get svc -n kubernetes-cicd
```

Application health can then be checked through the exposed service.

## Monitoring

The project also includes Kubernetes monitoring using Prometheus and Grafana.

The monitoring setup collects:

* Kubernetes deployment replica information
* Pod status
* Pod restart counts
* Node CPU metrics
* Node memory metrics
* Kubernetes application metrics

Kube State Metrics provides Kubernetes object-level metrics to Prometheus.

Grafana is used to visualize the collected metrics in a monitoring dashboard.

### Monitoring Stack

```text
Kubernetes
     |
     +---- Kube State Metrics
     |             |
     |             v
     |         Prometheus
     |             |
     |             v
     +--------> Grafana
```

The Grafana dashboard includes Kubernetes application and infrastructure monitoring panels.

## Git Workflow

The project follows a feature-branch workflow.

```text
main
 |
 +--> feature branch
          |
          +--> Code changes
          |
          +--> Commit
          |
          +--> Push
          |
          +--> Pull Request
                    |
                    +--> Review
                    |
                    +--> Merge
```

Example:

```bash
git checkout -b feature/<feature-name>

git add .

git commit -m "Add <feature>"

git push origin feature/<feature-name>
```

After the pull request is reviewed and merged, the changes become part of the `main` branch.

## Project Structure

```text
kubernetes-cicd-production-platform/
│
├── app/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   └── _test_/
│
├── k8s/
│   ├── namespace.yaml
│   ├── deployment.yaml
│   ├── service.yaml
│   ├── configmap.yaml
│   └── secret.yaml
│
├── screenshots/
│   ├── Git workflow
│   ├── Jenkins CI/CD
│   ├── Docker
│   ├── Amazon ECR
│   ├── Kubernetes
│   └── Monitoring
│
├── Dockerfile
├── Jenkinsfile
└── README.md
```

## What I Practiced

Through this project I worked on:

* Git feature branch and pull request workflow
* Node.js application containerization
* Docker image build and validation
* Automated testing with Jest
* Jenkins CI pipeline
* Docker image security scanning with Trivy
* Amazon ECR image management
* Kubernetes deployment and service configuration
* Kubernetes rolling deployment
* Deployment validation from Jenkins
* Kubernetes configuration using ConfigMaps and Secrets
* Prometheus metrics collection
* Kube State Metrics
* Grafana dashboard creation
* Basic Kubernetes troubleshooting

## Environment

This project was built and tested in a local Linux environment using Minikube.

The Kubernetes application runs with three replicas and is exposed through a NodePort service.

The project is intended as a practical DevOps portfolio project demonstrating the complete workflow rather than as a production application.
