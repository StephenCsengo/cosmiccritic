"""Change password col

Revision ID: e8898ca15aa3
Revises: 8e256a673bdb
Create Date: 2023-10-03 14:31:56.098155

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e8898ca15aa3'
down_revision = '8e256a673bdb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(), nullable=True))
        batch_op.drop_column('_User__password_hash')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('_User__password_hash', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('password_hash')

    # ### end Alembic commands ###
