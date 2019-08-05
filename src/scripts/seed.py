import csv
import psycopg2

try:
    connection = psycopg2.connect(user = "root",
                                  password = "",
                                  host = "127.0.0.1",
                                  port = "5432",
                                  dbname = 'cities')
    cursor = connection.cursor()
    csv.field_size_limit(1000000000)

    f = open('../data/cities_canada-usa.tsv')
    cursor.copy_from(f, 'cities', sep='\t', null='', columns=('name', 'country_code', 'admin1_code', 'longitude', 'latitude'))

except (Exception, psycopg2.Error) as error :
    if(connection):
        print("Failed to insert record into table", error)
finally:
    #closing database connection.
    if(connection):
        cursor.close()
        connection.close()
        print("PostgreSQL connection is closed")