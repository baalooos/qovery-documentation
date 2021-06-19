module.exports = {
    docs: [
        {
            type: 'category',
            label: 'Getting Started',
            items: [
                "getting-started",
                "getting-started/what-is-qovery",
                "getting-started/how-qovery-works",
                "getting-started/quickstart",
                "getting-started/whats-next",
                {
                    type: 'category',
                    label: 'Qovery vs. Other',
                    items: [
                        "getting-started/qovery-vs-other",
                        "getting-started/qovery-vs-other/heroku",
                        "getting-started/qovery-vs-other/netlify",
                        "getting-started/qovery-vs-other/terraform",
                    ],
                },
            ],
        },
        {
            type: 'category',
            label: 'Using Qovery',
            items: [
                "using-qovery",
                {
                    type: 'category',
                    label: 'Interface',
                    items: [
                        "using-qovery/interface",
                        "using-qovery/interface/cli",
                        "using-qovery/interface/web-interface",
                    ]
                },
                {
                    type: 'category',
                    label: 'Configuration',
                    items: [
                        "using-qovery/configuration",
                        "using-qovery/configuration/organization",
                        "using-qovery/configuration/project",
                        "using-qovery/configuration/environment",
                        "using-qovery/configuration/application",
                        {
                            type: 'category',
                            label: 'Database',
                            items: [
                                "using-qovery/configuration/database",
                                "using-qovery/configuration/database/postgresql",
                                "using-qovery/configuration/database/mysql",
                                "using-qovery/configuration/database/mongodb",
                                "using-qovery/configuration/database/redis",
                            ],
                        },
                        "using-qovery/configuration/environment-variable",
                        "using-qovery/configuration/secret",
                        "using-qovery/configuration/domain",
                        "using-qovery/configuration/storage",
                        "using-qovery/configuration/routing",
                        "using-qovery/configuration/policy",
                        {
                            type: 'category',
                            label: 'Cloud Service Provider',
                            items: [
                                "using-qovery/configuration/cloud-service-provider",
                                "using-qovery/configuration/cloud-service-provider/amazon-web-services",
                                "using-qovery/configuration/cloud-service-provider/azure",
                                "using-qovery/configuration/cloud-service-provider/google-cloud-platform",
                                "using-qovery/configuration/cloud-service-provider/digital-ocean",
                                "using-qovery/configuration/cloud-service-provider/scaleway",
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Build Platform',
                            items: [
                                "using-qovery/configuration/build-platform",
                                "using-qovery/configuration/build-platform/qovery-ci",
                                "using-qovery/configuration/build-platform/gitlab-ci",
                                "using-qovery/configuration/build-platform/circle-ci",
                                "using-qovery/configuration/build-platform/github-actions",
                            ],
                        },
                        {
                            type: 'category',
                            label: 'Container Registry',
                            items: [
                                "using-qovery/configuration/container-registry",
                                "using-qovery/configuration/container-registry/elastic-container-registry",
                                "using-qovery/configuration/container-registry/azure-container-registry",
                                "using-qovery/configuration/container-registry/digital-ocean-container-registry",
                                "using-qovery/configuration/container-registry/scaleway-container-registry",
                                "using-qovery/configuration/container-registry/docker-hub",
                            ],
                        },
                        "using-qovery/configuration/external-service",
                        {
                            type: 'category',
                            label: 'Monitoring',
                            items: [
                                "using-qovery/configuration/monitoring",
                                "using-qovery/configuration/monitoring/datadog",
                                "using-qovery/configuration/monitoring/new-relic",
                            ],
                        },
                    ]
                },
                {
                    type: 'category',
                    label: 'Integration',
                    items: [
                        "using-qovery/integration",
                        "using-qovery/integration/github-preview",
                        "using-qovery/integration/ide-plugins",
                    ]
                },
                {
                    type: 'category',
                    label: 'Troubleshoot',
                    items: [
                        "using-qovery/troubleshoot",
                    ]
                }
            ],
        },
        {
            type: 'category',
            label: 'Security and Compliance',
            items: [
                "security-and-compliance",
                "security-and-compliance/backup-and-restore",
                "security-and-compliance/encryption",
                "security-and-compliance/gdpr",
            ],
        },
        {
            type: 'category',
            label: 'Useful Links',
            items: [
                {
                    type: 'link',
                    label: 'API',
                    href: 'https://api-doc.qovery.com'
                },
                "useful-links/faq",
                {
                    type: 'link',
                    label: 'Roadmap',
                    href: 'https://roadmap.qovery.com'
                },
                {
                    type: 'link',
                    label: 'Github',
                    href: 'https://github.com/qovery'
                },
                "useful-links/help-and-support",
            ],
        },
    ]
};
