from flask import Flask, request, render_template, jsonify
from pcfg_grammar import *
from sentence import *
from parse2 import *


app = Flask(__name__)


@app.route('/')
def app_main():
    return render_template('index.html')


@app.route('/parse/')
def parse():
    sentence = request.args.get('sentence')
    print("Sentence received is: ", sentence)
    parsed_sen = parse_sen(PCFG_Grammar('test.gr'), Sentence(sentence), speedup=True)
    print("Parsed sentence is: ", parsed_sen)
    return jsonify({'sentence':sentence,'parse':parsed_sen});


if __name__ == '__main__':
    app.run()