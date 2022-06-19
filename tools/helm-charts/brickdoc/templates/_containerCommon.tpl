{{- define "brickdoc.deploymentCommon" }}
          image: {{ .Values.image.name | quote }}
          {{- if .Values.previewEnv }}
          imagePullPolicy: Always
          {{- end }}
          {{- if empty .Values.secrets  }}
          {{- else }}
          envFrom:
          - secretRef:
              name: {{ include "brickdoc.fullname" . }}
          {{- end }}
          env:
            {{- range $key, $value := .Values.envs }}
            - name: {{ $key }}
              value: {{ $value | quote }}
            {{- end }}
            - name: BRICKDOC_DOTCOM_LICENSE
              value: {{ .Values.license | quote }}
            {{- if .Values.previewEnv }}
            - name: PREVIEW_ENV
              value: "I hereby swear that I have obtained written permission from the Brickdoc Inc of this plugin to use it."
            - name: REDIS_URL
              value: redis://{{ include "brickdoc.devDependenciesService" . }}:6379
            - name: BRICKDOC_DATABASE_URL
              value: postgresql://postgres:NonPersistenceInstance@{{ include "brickdoc.devDependenciesService" . }}/brickdoc_cicd
            - name: SMTP_FROM
              value: smtp-mock@{{ .Values.ingress.host }}
            - name: SMTP_URL
              value: smtp://{{ include "brickdoc.devDependenciesService" . }}:1025
            - name: RAILS_MAX_THREADS
              value: "8"
            {{- end }}
{{- end }}
