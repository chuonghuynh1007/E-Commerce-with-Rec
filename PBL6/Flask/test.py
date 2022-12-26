import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import os
import cv2
import matplotlib.pyplot as plt

DATASET_PATH = "Flask/content/lite_dataset"
print(os.listdir(DATASET_PATH))

# augmentedDataframe = pd.DataFrame({
#     'filename': df['image'],
#     'type': df['articleType']
# })

# # total number of entries in the dataframe
# total_row = len(augmentedDataframe)
# print('total row count: ', total_row)

# augmentedDataframe.head(10)

# def load_image(i):
#     Image_path=DATASET_PATH+list_directory[index]+"/"+augmentedDataframe.loc[i,'filename']
#     Image_id=augmentedDataframe.loc[i,'filename'].split(".")
#     res=Image_id[0]
#     image = cv2.imread(Image_path,cv2.IMREAD_COLOR)
#     resized_img = cv2.resize(image, dsize=(224, 224))
#     return resized_img,res

# img,img_id = load_image(9)
# img=cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
# plt.title(img_id)
# plt.imshow(img)

# def make_prediction(img):
#     img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) 
#     resized_img = cv2.resize(img, dsize=(28, 28))
#     x_data = np.array(resized_img).reshape(-1, 28,28,1)
#     x_data=x_data/255
# #     print(x_data)
# #     print(x_data.shape)
#     result=model.predict(x_data)
# #     print(type(result))
# #     print(np.argmax(result))
#     return x_data,unique_types[np.argmax(result)]

# import math
# def calculateDistance(i1, i2):
#     return math.sqrt(np.sum((i1-i2)**2))

# distance_list=[]
# for i in range (0, len(X_numpy)):
#     distance_list.append(calculateDistance(numpy_image,X_numpy[i]))

# sorted_distance_list=distance_list.copy()
# #print(distance_list)
# sorted_distance_list.sort()

# least_ten_distance=sorted_distance_list[0:10]
# print(least_ten_distance)
# index_distance=[]
# for i in range (0, len(least_ten_distance)-1):
#     if(least_ten_distance[i]!=least_ten_distance[i+1]):
#         index_distance.append(distance_list.index(least_ten_distance[i]))

# index_distance=index_distance[0:5]

# print(index_distance)


# plt.imshow(img)
# plt.title(img_id)

# fig=plt.figure()
# fig.set_figheight(15)
# fig.set_figwidth(15)
# axis=[]
# for i in range(0,len(index_distance)):
#     print(X_id_similar[i])
#     Image_path=DATASET_PATH+list_directory[index]+"/"+str(X_id_similar[index_distance[i]])+".jpg"
#     src = cv2.imread(Image_path)
#     image = cv2.cvtColor(src, cv2.COLOR_BGR2RGB) 
#     axis.append(fig.add_subplot(1,5, i+1))
#     subplot_title=str(X_id_similar[index_distance[i]])
#     axis[-1].set_title(subplot_title)  
#     plt.imshow(image)

# fig.tight_layout()
# plt.show()