from marshmallow import Schema, fields

class PlainUserSchema(Schema):
    id = fields.Int(dump_only=True)
    username  = fields.Str(required=True)
    email = fields.Str(required=True)
    hash_password = fields.Str(required=True)