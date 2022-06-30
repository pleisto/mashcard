{{- define "mashcard.deploymentCommon" }}
          image: {{ .Values.image.name | quote }}
          {{- if .Values.previewEnv }}
          imagePullPolicy: Always
          {{- end }}
          {{- if empty .Values.secrets  }}
          {{- else }}
          envFrom:
          - secretRef:
              name: {{ include "mashcard.fullname" . }}
          {{- end }}
          env:
            {{- range $key, $value := .Values.envs }}
            - name: {{ $key }}
              value: {{ $value | quote }}
            {{- end }}
            - name: MASHCARD_DOTCOM_LICENSE
              value: {{ .Values.license | quote }}
            {{- if .Values.previewEnv }}
            - name: PREVIEW_ENV
              value: "true"
            - name: REDIS_URL
              value: redis://{{ include "mashcard.devDependenciesService" . }}:6379
            - name: MASHCARD_DATABASE_URL
              value: postgresql://postgres:NonPersistenceInstance@{{ include "mashcard.devDependenciesService" . }}/mashcard_cicd
            - name: SMTP_FROM
              value: smtp-mock@{{ .Values.ingress.host }}
            - name: SMTP_URL
              value: smtp://{{ include "mashcard.devDependenciesService" . }}:1025
            - name: RAILS_MAX_THREADS
              value: "8"
            {{- end }}
{{- end }}
