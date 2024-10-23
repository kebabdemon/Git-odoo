# -*- coding: utf-8 -*-

from odoo import models, fields, api


class owl(models.Model):
    _name = 'sale.order.template.option'
    _description = "sale.order.template.option"

    product_id = fields.Many2one('product.product', string='Product', required=True)
    display_name = fields.Char(string='Display Name', required=True)
    id = fields.Integer(string='ID', required=True)


