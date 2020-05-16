from flask import Flask
import RPi.GPIO as GPIO
import json
import os

app = Flask(__name__)
GPIO.setwarnings(False)
config_file = os.environ['HOME_SERVER_CONFIG']
config = {}
rooms = {}
with open(config_file) as json_data_file:
    try:
        config = json.load(json_data_file)
        if config["gpioMode"] == "BOARD":
            GPIO.setmode(GPIO.BOARD)
        else:
            GPIO.setmode(GPIO.BCM)

        rooms = config["rooms"]
        for room in rooms:
            for switch in rooms[room]:
                GPIO.setup(rooms[room][switch], GPIO.OUT)

    except Exception as err:
        print("Error Starting server")
        raise err


@app.route('/')
def switches():
    return {
        "success": True,
        "rooms": rooms
    }


@app.route('/<room>/<switch>/on')
def switch_on(room, switch):
    try:
        pin = rooms[room][switch]
        GPIO.output(pin, GPIO.HIGH)
        return {
            "success": True
        }
    except Exception as err:
        return {
            "success": False,
            "error": str(err)
        }

@app.route('/<room>/<switch>/off')
def switch_off(room, switch):
    try:
        pin = rooms[room][switch]
        GPIO.output(pin, GPIO.LOW)
        return {
            "success": True
        }
    except Exception as err:
        return {
            "success": False,
            "error": str(err)
        }

if __name__ == "__main__":
    app.run(host='0.0.0.0')