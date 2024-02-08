/* eslint-disable func-names */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api/v1/launchs',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
  app.use(
    '/api/v1/launch',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
  app.use(
    '/hbf/v1/launchs',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
  app.use(
    '/api/v1/launch_error',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
  app.use(
    '/hbf/v1/launch_error',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
  app.use(
    '/api/v1/executions',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
  app.use(
    '/api/v1/execution',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
  app.use(
    '/api/v1/assertions',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
  app.use(
    '/api/v1/assertion',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
  app.use(
    '/api/v1/request',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
  app.use(
    '/api/v1/response',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
  app.use(
    '/api/v1/json_schema',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
  app.use(
    '/hbf/v1/assertions',
    createProxyMiddleware({
      target: 'http://testops-ingress-controller.testops.svc.k8s.dldevel',
      changeOrigin: true,
    }),
  )
}
