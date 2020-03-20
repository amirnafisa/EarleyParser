from flask import Flask, request, render_template, jsonify
from pcfg_grammar import *
from sentence import *
from parse2 import *
import json


app = Flask(__name__)


@app.route('/')
def app_main():
    return render_template('index.html')


@app.route('/parse/')
def parse():
    sentence = request.args.get('sentence')
    parsed_sen = parse_sen(PCFG_Grammar('test.gr'), Sentence(sentence), speedup=True)
    grammar = []
    with open('test.gr', 'r') as f_gr:
        for line in f_gr:
            grammar.append(line)
    return jsonify({'sentence':sentence,'parse':parsed_sen, 'grammar':grammar});


if __name__ == '__main__':
    app.run()