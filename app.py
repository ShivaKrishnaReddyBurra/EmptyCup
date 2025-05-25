from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def init_db():
    conn = sqlite3.connect('designers.db')
    cursor = conn.cursor()
    cursor.execute('''  
        CREATE TABLE IF NOT EXISTS designers (
            id TEXT PRIMARY KEY,
            name TEXT,
            rating REAL,
            description TEXT,
            projects INTEGER,
            years INTEGER,
            priceLevel TEXT,
            phone1 TEXT,
            phone2 TEXT
        )
    ''')
    # Insert sample data if table is empty
    cursor.execute('SELECT COUNT(*) FROM designers')
    if cursor.fetchone()[0] == 0:
        cursor.executemany('''
            INSERT INTO designers (id, name, rating, description, projects, years, priceLevel, phone1, phone2)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', [
            ('1', 'Epic Designs', 3.5, 'Passionate team of 4 designers working out of Bangalore with an experience of 4 years.', 57, 8, '$$', '+91 - 984532853', '+91 - 984532854'),
            ('2', 'Studio - D3', 4.5, 'Passionate team of 4 designers working out of Bangalore with an experience of 4 years.', 43, 6, '$$$', '+91 - 984532853', '+91 - 984532854'),
            ('3', 'Creative Minds', 4.2, 'Innovative design studio based in Mumbai, specializing in modern interiors.', 72, 10, '$$$', '+91 - 987654321', '+91 - 987654322'),
            ('4', 'Urban Aesthetics', 3.8, 'Delhi-based designers with a focus on sustainable architecture.', 29, 5, '$$', '+91 - 912345678', '+91 - 912345679'),
            ('5', 'Vivid Spaces', 4.0, 'Chennai studio offering bespoke design solutions.', 65, 7, '$$$', '+91 - 923456789', '+91 - 923456790'),
            ('6', 'NexGen Designs', 3.9, 'Hyderabad team known for minimalist and functional designs.', 38, 4, '$$', '+91 - 934567890', '+91 - 934567891'),
            ('7', 'Artisan Interiors', 4.7, 'Pune-based firm with expertise in luxury residential projects.', 91, 12, '$$$$', '+91 - 945678901', '+91 - 945678902'),
            ('8', 'Eco Designs', 3.6, 'Kolkata studio focusing on eco-friendly materials.', 22, 3, '$', '+91 - 956789012', '+91 - 956789013'),
            ('9', 'Modern Makers', 4.1, 'Bangalore designers creating vibrant commercial spaces.', 50, 6, '$$', '+91 - 967890123', '+91 - 967890124'),
            ('10', 'Classic Creations', 3.4, 'Jaipur-based team with a flair for traditional aesthetics.', 15, 2, '$', '+91 - 978901234', '+91 - 978901235'),
            ('11', 'Trendsetters Studio', 4.3, 'Ahmedabad designers known for bold, contemporary styles.', 60, 9, '$$$', '+91 - 989012345', '+91 - 989012346'),
            ('12', 'Harmony Designs', 3.7, 'Coimbatore studio blending functionality with elegance.', 33, 5, '$$', '+91 - 990123456', '+91 - 990123457')
        ])
    conn.commit()
    conn.close()

@app.route('/api/designers', methods=['GET'])
def get_designers():
    try:
        conn = sqlite3.connect('designers.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM designers')
        rows = cursor.fetchall()
        designers = [
            {
                'id': row[0],
                'name': row[1],
                'rating': row[2],
                'description': row[3],
                'projects': row[4],
                'years': row[5],
                'priceLevel': row[6],
                'phone1': row[7],
                'phone2': row[8]
            } for row in rows
        ]
        conn.close()
        return jsonify(designers)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000)