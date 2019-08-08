#!/usr/bin/env bash

echo -n "Checking for nodejs..."
npm -v
if [ $? -ne 0 ]; then
	echo "npm is not installed"
	exit 1
fi

echo -n "Checking for pip..."
pip --version
if [ $? -ne 0 ]; then
	echo "pip is not installed"
	exit 1
fi

echo -n "Checking for JupyterLab..."
jupyter lab --version 2>/dev/null
if [ $? -ne 0 ]; then
	echo "jupyter lab is not installed"
	exit 1
fi

echo -n "Checking for @jupyter-widgets/jupyterlab-manager"
jupyter labextension check @jupyter-widgets/jupyterlab-manager --installed
if [ $? -ne 0 ]; then
	echo "Installing @jupyter-widgets/jupyterlab-manager extension"
	jupyter labextension install  @jupyter-widgets/jupyterlab-manager
fi

set -e
echo -n "Installing javascript code"
npm install
npm run build:all

echo -n "Installing python code"
pip install -v -e .



echo "Installing sidepanel extension"
jupyter labextension link
