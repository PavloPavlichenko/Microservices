kind create cluster --config "./Kubernetes/Common/cluster.yaml"
kubectl apply -f "./Kubernetes/Common/application_namespace.yaml"
kubectl apply -f "./Kubernetes/Common/ingress.yaml"