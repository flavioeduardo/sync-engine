import glob
import os
from setuptools import setup, find_packages


setup(
    name="inbox-sync",
    version="0.4",
    packages=find_packages(),

    install_requires=[],

    include_package_data=True,
    package_data={
        # "inbox-sync": ["alembic.ini"],
        # If any package contains *.txt or *.rst files, include them:
        # '': ['*.txt', '*.rst'],
        # And include any *.msg files found in the 'hello' package, too:
        # 'hello': ['*.msg'],
    },
    data_files=[("alembic-inbox-sync", ["alembic.ini"]),
                ("alembic-inbox-sync/migrations",
                 filter(os.path.isfile, glob.glob("migrations/*"))),
                ("alembic-inbox-sync/migrations/versions",
                 filter(os.path.isfile, glob.glob("migrations/versions/*")))
                ],

    scripts=['bin/inbox-start',
             'bin/inbox-console',
             'bin/inbox-auth',
             'bin/delete-account-data',
             'bin/create-db',
             'bin/create-test-db',
             'bin/verify-db',
             'bin/migrate-db',
             'bin/stamp-db',
             'bin/inbox-api',
             'bin/get-id',
             'bin/get-object',
             'bin/set-throttled',
             'bin/syncback-service',
             'bin/contact-search-service',
             'bin/contact-search-backfill',
             'bin/contact-search-delete-index',
             'bin/populate-sync-queue',
             'bin/delete-marked-accounts',
             'bin/backfix-generic-imap-separators.py',
             'bin/backfix-duplicate-categories.py',
             'bin/correct-autoincrements',
             'bin/update-categories',
             'bin/detect-missing-sync-host',
             'bin/purge-transaction-log',
             'bin/mysql-prompt',
             'bin/unschedule-account-syncs',
             'bin/syncback-stats'
             ],

    # See:
    # https://pythonhosted.org/setuptools/setuptools.html#dynamic-discovery-of-services-and-plugins
    # https://pythonhosted.org/setuptools/pkg_resources.html#entry-points
    zip_safe=False,
    author="Nylas Team",
    author_email="team@nylas.com",
    description="The Nylas Sync Engine",
    license="AGPLv3",
    keywords="nylas",
    url="https://www.nylas.com",
)
