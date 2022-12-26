# -*- coding: utf-8 -*-
"""Recommend_PBL6.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1x2_UkpQsRX4vRlttqM_NCw4sbpoVJ6yC
"""

# Commented out IPython magic to ensure Python compatibility.
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import os
import cv2
import matplotlib.pyplot as plt
from keras import models

# %matplotlib inline

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
DATASET_PATH = "E:/Bao's Code/PBL6/Flask/content/"
# script_dir = os.path.dirname(__file__)
# print(script_dir)
#print(os.listdir(DATASET_PATH))

'''df = pd.read_csv(DATASET_PATH + "styles.csv", nrows=44000, error_bad_lines=False)
condition = ['Tshirts',
 'Shirts',
 'Casual Shoes',
 'Watches',
 'Sports Shoes',
 'Kurtas',
 'Handbags',
 'Tops',
 'Heels',
 'Sunglasses']
i = 0
rev = []
category = {'Tshirts':0,
 'Shirts':0,
 'Casual Shoes':0,
 'Watches':0,
 'Sports Shoes':0,
 'Kurtas':0,
 'Handbags':0,
 'Tops':0,
 'Heels':0,
 'Sunglasses':0}
for i in range(df.shape[0]):
  if df['articleType'][i] not in condition:
    rev.append(i)
  elif category[df['articleType'][i]]>=10:
    rev.append(i)
  else:
    category[df['articleType'][i]] += 1
df = df.drop(rev)

df['image'] = df.apply(lambda row: str(row['id']) + ".jpg", axis=1)

idx = df.index

augmentedDataframe = pd.DataFrame({
    'filename': df['image'],
    'type': df['articleType']
})

# total number of entries in the dataframe
total_row = len(augmentedDataframe)
print('total row count: ', total_row)

#augmentedDataframe.head(10)
unique_types = augmentedDataframe['type'].unique().tolist()
total_class = len(unique_types)
print(total_class)
print(unique_types)
#print(unique_types[0])
#print(unique_types.index(unique_types[0]))
augmentedDataframe['number_types'] = augmentedDataframe['type'].apply(lambda x: unique_types.index(x) if x in unique_types else 0)
#augmentedDataframe.head(10)
'''
#augmentedDataframe['type'].value_counts()
df = pd.read_pickle("E:/Bao's Code/PBL6/Flask/PBL6_AI/dataFrame.pkl")
augmentedDataframe = pd.read_pickle("E:/Bao's Code/PBL6/Flask/PBL6_AI/augmented.pkl")
list_directory = os.listdir(DATASET_PATH)
# print(list_directory[0])
unique_types = augmentedDataframe['type'].unique().tolist()
index = 0


model = models.load_model("E:/Bao's Code/PBL6/Flask/PBL6_AI/visual_product_recommend (25k).h5")

def load_image(i):
    Image_path=DATASET_PATH+list_directory[index]+"/"+augmentedDataframe.loc[i,'filename']
    print(list_directory[index])
    Image_id=augmentedDataframe.loc[i,'filename'].split(".")
    res=Image_id[0]
    image = cv2.imread(Image_path,cv2.IMREAD_COLOR)
    '''if image is None:a
      print("WRONG PATH")
      return 0'''
    resized_img = cv2.resize(image,dsize=(224, 224))
    return resized_img,res

img,img_id = load_image(15)
img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
plt.title(img_id)
plt.imshow(img)

def make_prediction(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
    resized_img = cv2.resize(img, dsize=(28, 28))
    x_data = np.array(resized_img).reshape(-1, 28,28,1)
    x_data=x_data/255
#     print(x_data)
#     print(x_data.shape)
    result=model.predict(x_data)
#     print(type(result))
#     print(np.argmax(result))
    return x_data,unique_types[np.argmax(result)]

numpy_image,result=make_prediction(img)
print("Result: ",result)

#df.head(10)

# """Starting Check for Similarity"""
# category = {'Tshirts':0,
#  'Shirts':0,
#  'Casual Shoes':0,
#  'Watches':0,
#  'Sports Shoes':0,
#  'Kurtas':0,
#  'Handbags':0,
#  'Tops':0,
#  'Heels':0,
#  'Sunglasses':0}
typeList=[]
for i, row in df.iterrows():
    # category[row["articleType"]]+=1
    if(row["articleType"]==result):
        #print(row["id"],row["articleType"])
        if(img_id!=str(row["id"])):
            typeList.append(row['id'])

#print(typeList)
# print(category)
i=0
X_similar=[]
X_id_similar=[]
X_numpy=[]
for imageId in typeList:
#     print(imageId)
    Image_path=DATASET_PATH+list_directory[index]+"/"+str(imageId)+".jpg"
    image = cv2.imread(Image_path,cv2.IMREAD_GRAYSCALE)
    try:
        resized_img = cv2.resize(image, dsize=(28,28))
    except:
        #print("can't read file: ", str(imageId)+".jpg")
        pass
    X_similar.append(resized_img)
    X_id_similar.append(imageId)
        
X_numpy = np.array(X_similar).reshape(-1, 28,28,1)
X_numpy = X_numpy/255
#print(X_numpy[0])

plt.imshow(X_similar[0])
plt.title(X_id_similar[0])

"""Calculating Vector Distance between Two Image"""

import math
def calculateDistance(i1, i2):
    return math.sqrt(np.sum((i1-i2)**2))

print("Distance: ",calculateDistance(numpy_image,X_numpy[0]))

distance_list=[]
for i in range (0, len(X_numpy)):
    distance_list.append(calculateDistance(numpy_image,X_numpy[i]))

sorted_distance_list=distance_list.copy()
#print(distance_list)
sorted_distance_list.sort()

least_ten_distance=sorted_distance_list[0:10]
print(least_ten_distance)
index_distance=[]
for i in range (0, len(least_ten_distance)-1):
    if(least_ten_distance[i]!=least_ten_distance[i+1]):
        index_distance.append(distance_list.index(least_ten_distance[i]))

index_distance=index_distance[0:5]

print("Index distance: ",index_distance)

"""Recommended Items"""

# Image_path=DATASET_PATH+list_directory[index]+"/"+str(img_id)+".jpg"
# src = cv2.imread(Image_path)
# image = cv2.cvtColor(src, cv2.COLOR_BGR2RGB) 
plt.imshow(img)
plt.title(img_id)

fig=plt.figure()
fig.set_figheight(15)
fig.set_figwidth(15)
axis=[]
for i in range(0,len(index_distance)):
    print(X_id_similar[i])
    Image_path=DATASET_PATH+list_directory[index]+"/"+str(X_id_similar[index_distance[i]])+".jpg"
    src = cv2.imread(Image_path)
    image = cv2.cvtColor(src, cv2.COLOR_BGR2RGB) 
    axis.append(fig.add_subplot(1,5, i+1))
    subplot_title=str(X_id_similar[index_distance[i]])
    axis[-1].set_title(subplot_title)  
    plt.imshow(image)

fig.tight_layout()
plt.show()

#df.to_pickle("E:/MyProject/PBL6_AI/dataFrame.pkl")
#augmentedDataframe.to_pickle("E:/MyProject/PBL6_AI/augmented.pkl")
