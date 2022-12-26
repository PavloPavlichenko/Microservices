{{- define "backend.image" -}}
{{ include "common.images.image" (dict "imageRoot" .Values.backend.image) }}
{{- end -}}

{{- define "backend.fullname" -}}
{{- printf "%s-backend" (include "common.names.fullname" .) -}}
{{- end -}}
