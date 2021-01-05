import os
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import cv2
import sys
import numpy as np
sys.path.insert(1, './classify/src')
from keras.preprocessing import image
from keras.models import load_model
from crfrnn_model import get_crfrnn_model_def
import util
from keras.applications.imagenet_utils import preprocess_input
from tensorflow.compat.v1 import ConfigProto
from tensorflow.compat.v1 import InteractiveSession
import tensorflow as tf
from tensorflow.python.framework import ops
from tensorflow import keras
from keras import backend as K

import threading
import time
import gc
from numba import cuda
import sys
import getopt
import prettytable as pt

saved_model_path = './classify/crfrnn_keras_model.h5'

classes_name_list = ['DF11','DF11G','DF11Z','DF4DK','DF4DD','DF4_ARMY','DF4_BLUE','DF4_ORANGE','DF4_Ukrine','DF4_WATERMELON','DF4_WG','DF8B','HXD1D','HXD3D','HXN3','HXN3B','HXN5','HXN5B','ND5','NJ2','SS7D','SS7E','SS8','SS9','SS9G']
model = load_model('./classify/inception_v3_model_weights.h5') 

def seg(filename):
    input_file=("./public/uploads/"+filename)
    resized_file=("./classify/resize/"+filename+".png")
    temp_file=("./classify/images_temp/"+filename+".png")
    cut_file=("./classify/images_cut/"+filename+".png")

    image = cv2.imread(input_file)
    height, width = image.shape[0], image.shape[1]
    width_new = 480
    height_new = 270

    if width / height >= width_new / height_new:
        source = cv2.resize(image, (width_new, int(height * width_new / width)))
    else:
        source = cv2.resize(image, (int(width * height_new / height), height_new))
    
    cv2.imwrite(resized_file,source)

    model = get_crfrnn_model_def()
    model.load_weights(saved_model_path)

    img_data, img_h, img_w, size = util.get_preprocessed_image(resized_file)
    probs = model.predict(img_data, verbose=False)[0]
    segmentation = util.get_label_image(probs, img_h, img_w, size)
    segmentation.save(temp_file)

    target = cv2.imread(temp_file)
    sp = source.shape
    count = sp[0]*sp[1] 
    for i in range(sp[0]):
        for j in range(sp[1]):
            if (target[i,j] != (0,192,128)).any():
                source[i,j] = (255,255,255)
                count-=1
        
    os.remove(resized_file)
    os.remove(temp_file)

    if count>100:
        cv2.imwrite(cut_file,source)
        return 0
    else:
        return -1

def classfy(filename):
    img_path=("./classify/images_cut/"+filename+".png")
    img = image.load_img(img_path, target_size=(400,400))
    x = image.img_to_array(img)
    x=x/255
    x = np.expand_dims(x,0)
    preds = model.predict(x)
    os.remove(img_path)
    return  classes_name_list[preds.argmax()]

def main(argv):
    filename=''
    try:
        opts,args = getopt.getopt(argv,"hi:",["ifile="])
    except getopt.GetoptError:
        print ('main.py -i <filename>')
        sys.exit(2)
    for opt,arg in opts:
        if opt == '-h':
            print ('Place the image file into ./images and use main.py -i <filename> to run this script')
            sys.exit()
        elif opt in ("-i","--ifile"):
            filename=arg
    res = seg(filename)
    if res == -1:
        print ("Can`t recognize this image")
        sys.exit()
    print (classfy(filename))

if __name__ == '__main__':
    main(sys.argv[1:])
