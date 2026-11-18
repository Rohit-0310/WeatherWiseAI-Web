# Contributing

For ordinary bugs or proposals, use [GitHub Issues](https://github.com/Rohit-0310/WeatherWiseAI-Web/issues). Include a reproducible example, expected and actual behavior, and relevant versions. Remove credentials, private logs and personal data. Report vulnerabilities privately using the [security policy](SECURITY.md).

1. Fork the repository and create a focused branch from `main`.
2. Follow the [development guide](docs/DEVELOPMENT_GUIDE.md) and [coding standards](docs/CODING_STANDARDS.md).
3. Run lint, TypeScript, the production build and relevant browser smoke checks. List commands and outcomes in the pull request, including existing failures.
4. Update docs when behavior or configuration changes. For contract changes, identify the impact on the companion repository.
5. Use a clear Conventional Commit message and explain the behavior change and verification in the pull request. Include before/after images for relevant UI changes.

The code is [MIT licensed](LICENSE). Use [Semantic Versioning](https://semver.org/) when planning releases after agreeing on supported interfaces. Record changes in [the changelog](docs/CHANGELOG.md). Breaking public behavior requires explicit migration notes and an appropriate major version after 1.0.
