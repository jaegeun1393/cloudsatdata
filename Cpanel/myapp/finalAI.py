# import the necessary packages
from imutils.perspective import four_point_transform
from skimage.filters import threshold_local
from gradingSAT import *
import numpy as np
import cv2
import imutils

def satgrading(img, satAnswer, satGradingScale):
    ######################### SAT answer lst
    ans_sec_1 = ""
    ans_sec_2 = ""
    ans_sec_3_1 = ""
    ans_sec_3_2 = ""
    ans_sec_4_1 = ""
    ans_sec_4_2 = ""

    #Number of section the answer sheet has
    section1 = 0 #get the max size of the section
    section2 = 0
    section3 = 0
    section4 = 0
    sec1c = [] #arr of contours
    sec2c = []
    sec3c = [] 
    sec4c = []
    image = cv2.imread(img, 1)

    #########################

    # load the image
    ratio = image.shape[0] / 2500.0
    original = image.copy()
    image = cv2.resize(original, (0,0), fx=1/ratio, fy=1/ratio)

    #Change the image to gray scale and trace the edge of the paper
    imggray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    imggray = cv2.GaussianBlur(imggray, (1, 1), 0)
    #cv2.imshow("imggray", imggray)
    imgedged = cv2.Canny(imggray, 75, 120)
    #cv2.imshow("imgedged", imgedged)
    #cv2.waitKey(0)

    #find all spaces and sorted them to find the max size 
    cnts = cv2.findContours(imgedged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    cnts = sorted(cnts, key = cv2.contourArea, reverse = True)[:5]

    # loop over the contours
    for c in cnts:
        # approximate the contour
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)

        # if our approximated contour has four points, then we
        # can assume that we have found our screen
        if len(approx) == 4:
            screenCnt = approx
            break

    #cv2.drawContours(original, [screenCnt], -1, (0, 255, 0), 2) #draw the edge
    # image is the file that has the green line to trace the edge of the paper

    #crop image to the rectangle
    warped = four_point_transform(original, screenCnt.reshape(4, 2) * ratio)
    warorigin = imutils.resize(warped, width=1951, height = 1577)
    warorigincpy = warorigin.copy()
    #cv2.imshow("warped", warped)
    #cv2.waitKey(0)

    #Split in to sections

    #imgBlur=cv2.GaussianBlur(warorigin,(5,5),1)
    #imgCanny=cv2.Canny(imgBlur,10,50) #edit image for split into diff section
    #cv2.imshow("imgCanny form", imgCanny)
    #cv2.waitKey(0)


    warorigin = cv2.cvtColor(warorigin, cv2.COLOR_BGR2GRAY)
    warorigin = cv2.GaussianBlur(warorigin, (1, 1), 0)
    warorigin = cv2.Canny(warorigin , 60, 100)
    #cv2.imshow("warorigin", warorigin)
    #cv2.waitKey(0)

    contours, h =cv2.findContours(warorigin,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE) #Find contours

    for cnt in contours:
        a = cv2.contourArea(cnt) #a = area
        x, y, w, h = cv2.boundingRect(cnt)
        if w > 900 and h > 200:
            if a > section4:
                section3 = section4
                sec3c = sec4c
                section1 = section3
                sec1c = sec3c
                section2 = section1
                sec2c = sec1c

                section4 = a
                sec4c = cnt
            elif a > section3:
                section1 = section3
                sec1c = sec3c
                section2 = section1
                sec2c = sec1c

                section3 = a
                sec3c = cnt
            elif a > section1:
                section2 = section1
                sec2c = sec1c

                section1 = a
                sec1c = cnt
            elif a > section2:
                section2 = a
                sec2c = cnt

    ##Section 4
    x, y, w, h = cv2.boundingRect(sec4c)
    pts1 = np.float32([[x, y], [x+w, y], [x, y+h], [x+w, y+h]])
    pts2 = np.float32([[0, 0], [w, 0], [0, h], [w, h]])
    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    section4 = cv2.warpPerspective(warorigincpy, matrix, (w, h))
    section4 = imutils.resize(section4, width=1855, height = 1148)

    #Section 4-1
    section41 = section4[0: section4.shape[0], 0: 330]
    ans_sec_4_1 = gradingsection(section41, 30, 1, 30, 30, 50)

    #Section 4-2
    section42 = section4[0: section4.shape[0], 430: section4.shape[1]]
    section42 = imutils.resize(section42, width=1416, height = 1148)
    #cv2.imshow("section42 form", section42)
    cv2.waitKey(0)
    ans_sec_4_2 = gradingsectionvertical2(section42, 4, 72)



    ##Section 3
    x, y, w, h = cv2.boundingRect(sec3c)
    pts1 = np.float32([[x, y], [x+w, y], [x, y+h], [x+w, y+h]])
    pts2 = np.float32([[0, 0], [w, 0], [0, h], [w, h]])
    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    section3 = cv2.warpPerspective(warorigincpy, matrix, (w, h))
    section3 = imutils.resize(section3, width=1855, height = 626)

    #Section 3-1
    section31 = section3[0: section3.shape[0], 0: 330]
    ans_sec_3_1 = gradingsection(section31, 15, 1, 15, 30, 50)

    #Section 3-2
    section32 = section3[0: section3.shape[0], 445: section3.shape[1]]
    section32 = imutils.resize(section32, width=1416, height = 626)
    ans_sec_3_2 = gradingsectionvertical(section32, 5, 62)



    #Section 1
    x, y, w, h = cv2.boundingRect(sec1c)
    pts1 = np.float32([[x, y], [x+w, y], [x, y+h], [x+w, y+h]])
    pts2 = np.float32([[0, 0], [w, 0], [0, h], [w, h]])
    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    section1 = cv2.warpPerspective(warorigincpy, matrix, (w, h))
    section1 = imutils.resize(section1, width=1855, height = 424)
    ans_sec_1 = gradingsection(section1, 11, 5, 52, 30, 50)




    #Section 2
    x, y, w, h = cv2.boundingRect(sec2c)
    pts1 = np.float32([[x, y], [x+w, y], [x, y+h], [x+w, y+h]])
    pts2 = np.float32([[0, 0], [w, 0], [0, h], [w, h]])
    matrix = cv2.getPerspectiveTransform(pts1, pts2)
    section2 = cv2.warpPerspective(warorigincpy, matrix, (w, h))
    section2 = imutils.resize(section2, width=1855, height = 477)
    ans_sec_2 = gradingsection(section2, 9, 5, 44, 30, 50)

    #Get answers

    #section 1
    corr = 0
    for i in range(0, 52):
        if satAnswer[4][i] == ans_sec_1[i]:
            corr = corr + 1

    #print("Reading Score: ", satGradingScale[0][corr])

    #section 2
    corr2 = 0
    for i in range(0, 44):
        if satAnswer[5][i] == ans_sec_2[i]:
            corr2 = corr2 + 1
    #print("Writing Score: ", satGradingScale[1][corr2])

    #print("English: ", (int(satGradingScale[1][corr2]) + int(satGradingScale[0][corr])) * 10)

    #section 3
    corr31 = 0
    for i in range(0, 15):
        if satAnswer[2][i] == ans_sec_3_1[i]:
            corr31 = corr31 + 1

    #section 32
    corr32 = 0
    for i in range(0, 5):
        arr = satAnswer[3][i].split("|")
        for j in range(0, len(arr)):
            if arr[j] == ans_sec_3_2[i]:
                corr32 = corr32 + 1

    #section 41
    corr41 = 0
    for i in range(0, 30):
        if satAnswer[0][i] == ans_sec_4_1[i]:
            corr41 = corr41 + 1

    #section 42
    corr42 = 0
    for i in range(0, 8):
        arr = satAnswer[1][i].split("|")
        for j in range(0, len(arr)):
            if arr[j] == ans_sec_4_2[i]:
                corr42 = corr42 + 1

    #print("Math: ", (satGradingScale[2][corr31+corr32+corr41+corr42]))

    #print("Total score: ", (int(satGradingScale[2][corr31+corr32+corr41+corr42])) + int((int(satGradingScale[1][corr2]) + int(satGradingScale[0][corr]))) * 10)
    
    #print(corr, corr2, corr31, corr32, corr41, corr42)

    eng_score = str((int(satGradingScale[2][corr2]) + int(satGradingScale[1][corr]))* 10)
    mth_score = str(satGradingScale[0][corr31+corr32+corr41+corr42])
    sat_eng_ans1 = str(ans_sec_1)
    sat_eng_ans2 = str(ans_sec_2)
    sat_mth_ans1 = str(ans_sec_3_1)
    sat_mth_ans2 = str(ans_sec_3_2)
    sat_mth_ans3 = str(ans_sec_4_1)
    sat_mth_ans4 = str(ans_sec_4_2)

    return eng_score, mth_score, sat_eng_ans1, sat_eng_ans2, sat_mth_ans1, sat_mth_ans2, sat_mth_ans3, sat_mth_ans4