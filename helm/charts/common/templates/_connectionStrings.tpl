{{- define "common.connection.string" -}}
{{- $host := .databaseRoot.host -}}
{{- $username := .databaseRoot.username -}}
{{- $password := .databaseRoot.password -}}
{{- $database := .databaseRoot.database -}}
{{- printf "Host=%s;Username=%s;Password=%s;Database=%s;" $host $username $password $database -}}
{{- end -}}