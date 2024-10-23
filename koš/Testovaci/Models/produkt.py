from odoo import api, fields, models

class Produkt(models.Model):
    _name = "test.produkt"
    _inherit = ['mail.thread']
    _description = "Test Produkt"
    _rec_name = 'jmeno'

    jmeno = fields.Char(string='Název Produktu',tracking=True, required=True)
    scislo = fields.Integer(string='Sériové Číslo', required=True)
    typ = fields.Selection([('s','S'),('v','V')],string="Typ")