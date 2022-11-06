{{- define "backend.image" -}}
{{ include "common.images.image" (dict "imageRoot" .Values.backend.image) }}
{{- end -}}

{{- define "backend.initImage" -}}
{{ include "common.images.image" (dict "imageRoot" .Values.backend.initMigration.image) }}
{{- end -}}

{{- define "backend.fullname" -}}
{{- printf "%s-backend" (include "common.names.fullname" .) -}}
{{- end -}}

{{- define "frontend.image" -}}
{{ include "common.images.image" (dict "imageRoot" .Values.frontend.image) }}
{{- end -}}

{{- define "frontend.fullname" -}}
{{- printf "%s-frontend" (include "common.names.fullname" .) -}}
{{- end -}}

{{- define "connection.string" -}}
{{- printf "%s-frontend" (include "common.names.fullname" .) -}}
{{- end -}}