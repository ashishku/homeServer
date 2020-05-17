from functools import partial
from flask import Flask
import RPi.GPIO as GPIO
import json
import os

app = Flask(__name__)
GPIO.setwarnings(False)
config_file = os.environ['HOME_SERVER_CONFIG']
config = {}
rooms = {}


def button_callback(pin, pin2):
    current_state = GPIO.input(pin2)
    if current_state == 1:
        GPIO.output(pin, GPIO.LOW)
    else:
        GPIO.output(pin, GPIO.HIGH)

with open(config_file) as json_data_file:
    try:
        config = json.load(json_data_file)
        if config["gpioMode"] == "BOARD":
            GPIO.setmode(GPIO.BOARD)
        else:
            GPIO.setmode(GPIO.BCM)

        rooms = config["rooms"]
        for room in rooms:
            for switch in rooms[room]["switches"]:
                GPIO.setup(rooms[room]["switches"][switch]["pin"], GPIO.OUT)
                GPIO.setup(rooms[room]["switches"][switch]["pin2"], GPIO.IN, pull_up_down=GPIO.PUD_UP)  # Set pin 10 to be an input pin and set
                GPIO.add_event_detect(rooms[room]["switches"][switch]["pin2"],
                                      GPIO.FALLING,
                                      callback=partial(button_callback, rooms[room]["switches"][switch]["pin"]),
                                      bouncetime=200)

    except Exception as err:
        print("Error Starting server")
        raise err


@app.route('/')
def switches():
    return {
        "success": True,
        "rooms": get_response_payload()
    }


@app.route('/<room>/<switch>/on')
def switch_on(room, switch):
    try:
        pin = get_switch_attr(room, switch)
        GPIO.output(pin, GPIO.HIGH)
        return {
            "success": True,
            "rooms": get_response_payload()
        }
    except Exception as err:
        return {
            "success": False,
            "error": str(err)
        }


@app.route('/<room>/<switch>/off')
def switch_off(room, switch):
    try:
        pin = get_switch_attr(room, switch)
        GPIO.output(pin, GPIO.LOW)
        return {
            "success": True,
            "rooms": get_response_payload()
        }
    except Exception as err:
        return {
            "success": False,
            "error": str(err)
        }


def get_response_payload():
    payload = []
    for room in rooms:
        _room = {
            "id": room,
            "label": rooms[room]["label"],
            "switches": []
        }
        for switch in rooms[room]["switches"]:
            _room["switches"].append({
                "id": switch,
                "label": get_switch_attr(room, switch, "label"),
                "type": get_switch_attr(room, switch, "type"),
                "on": GPIO.input(get_switch_attr(room, switch)) == 1
            })

        payload.append(_room)
    return payload


def get_switch_attr(room, switch, attr="pin"):
    return rooms[room]["switches"][switch][attr]


if __name__ == "__main__":
    app.run(host='0.0.0.0')

