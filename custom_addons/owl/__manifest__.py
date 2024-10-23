# -*- coding: utf-8 -*-
{
    'name': "OWL",

    'summary': "NEVIM ASI AHOJ",

    'description': """
UGANDA
    """,

    'author': "LUDA",

    'category': 'Uncategorized',
    'version': '0.0.1',

    # any module necessary for this one to work correctly
    'depends': ['base', 'sale'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/menuitems.xml',
        'views/views.xml',
        'views/templates.xml',

    ],
    "installable": True,
    "application": True,
    "auto_install": False,
}
