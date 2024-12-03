#!/usr/bin/python3
""" Starts a Flask Web Application with dynamic filters """
from models import storage
from models.state import State
from models.city import City
from models.amenity import Amenity
from models.place import Place
from os import environ
from flask import Flask, render_template, request
import uuid

app = Flask(__name__)

@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()

@app.route('/4-hbnb', methods=['GET', 'POST'])
def hbnb():
    """ HBNB with amenities filter """
    states = storage.all(State).values()
    states = sorted(states, key=lambda k: k.name)
    st_ct = []

    for state in states:
        st_ct.append([state, sorted(state.cities, key=lambda k: k.name)])

    amenities = storage.all(Amenity).values()
    amenities = sorted(amenities, key=lambda k: k.name)

    places = storage.all(Place)
    if request.method == 'POST':
        # Get the list of checked amenities from the form
        selected_amenities = request.form.getlist('amenities')
        filtered_places = []

        # Filter places based on the selected amenities
        for place in places.values():
            if all(amenity.id in selected_amenities for amenity in place.amenities):
                filtered_places.append(place)

        places = filtered_places  # Update places with filtered results

    cache_id = str(uuid.uuid4())  # Unique cache ID to prevent caching issues
    return render_template('4-hbnb.html',
                           states=st_ct,
                           amenities=amenities,
                           places=places,
                           cache_id=cache_id)

if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=5000)
