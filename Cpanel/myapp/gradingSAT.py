# import the necessary packages
from imutils import contours
from imutils.perspective import four_point_transform
from skimage.filters import threshold_local
import numpy as np
import argparse
import imutils
import cv2

def gradingsection(image, row, col, num, prex, locy): #10, 5, 52
    (thresh, image) = cv2.threshold(image, 200, 255, cv2.THRESH_BINARY)
    #cv2.imshow("section2 form", image)
    #cv2.waitKey(0)
    nump = 1
    answerlst = []
    cX = [88, 135, 182, 229]
    for c in range(0, col):
        for r in range(0, row):
            cropped = image[(r * 36) + locy: ((r+1) * 36) + locy, (c * 380) + prex: ((c+1) * 380) + prex]
            #cv2.imshow("cropped form", cropped) 
            #cv2.waitKey(0)
            loc = 0
            shdlst = []
            for locx in cX:
                letter = cropped[0: 25, locx-15: locx + 25]
                #cv2.imshow("letter form", letter) 
                #cv2.waitKey(0)
                shdlvl = np.average(letter)
                shdlst.append(shdlvl)
                #print(shdlvl)

            shdlst = np.array(shdlst)
            mymin = np.min(shdlst)
            loc = [i for i, x in enumerate(shdlst) if x == mymin]
            loc = cX[loc[0]]

            if loc == 0:
                ans = "?"
            elif loc == 88:
                ans = "A"
            elif loc == 135:
                ans = "B"
            elif loc == 182:
                ans = "C"
            elif loc == 229:
                ans = "D"
            
            answerlst.append(ans)  
            if nump == num:
                r = row
                c = col
#                print(len(answerlst))
                break

            nump = nump + 1              
        
    #print(answerlst)
    return answerlst

def gradingsectionvertical(image, num, prex): #10, 5, 52
    (thresh, image) = cv2.threshold(image, 200, 255, cv2.THRESH_BINARY)
    anslst = []
    for i in range(0, num):
        cropped = image[135: 560, (i * 285) + prex: ((i+1) * 285) + 15]
        #cv2.imshow("cropped form", cropped) 
        #cv2.waitKey(0)
        cX = [40, 80, 125, 180]
        answer = ""
        for locx in cX:
            line = cropped[0: 480, locx-28: locx + 6]
            ans = "A"
            #cv2.imshow("line form", line) 
            #cv2.waitKey(0)
            #avg_shdlvl = np.average(line)
            arr = []
            for cnt in range(0, 12):
                letter = line[(cnt * 35): ((cnt+1) *35) + 3, 0: 40]
            #    cv2.imshow("letter form", letter) 
            #    cv2.waitKey(0)

                shdlvl = np.average(letter)
                #print(shdlvl)
                arr.append(shdlvl)
            arr.sort()

            for cnt in range(0, 12):
                letter = line[(cnt * 35): ((cnt+1) *35) + 3, 0: 40]
                shdlvl = np.average(letter)
                shdavg = np.average(arr)
                #print("avg ", shdavg)
                if arr[0] == shdlvl and (shdlvl < (shdavg - float(shdavg * 0.25))):
                #    print("=", shdlvl)
                    if ans == "A" and ("?" not in  answer):
                        if cnt == 0:
                            ans = "/"
                        elif cnt == 1:
                            ans = "."
                        elif cnt == 2:
                            ans = "0"
                        elif cnt == 3:
                            ans = "1"
                        elif cnt == 4:
                            ans = "2"
                        elif cnt == 5:
                            ans = "3"
                        elif cnt == 6:
                            ans = "4"
                        elif cnt == 7:
                            ans = "5"
                        elif cnt == 8:
                            ans = "6"
                        elif cnt == 9:
                            ans = "7"
                        elif cnt == 10:
                            ans = "8"
                        elif cnt == 11:
                            ans = "9"
                    else:
                        answer = "?"
                        #print("here")

                    if ans != "A":
                        answer += ans

        anslst.append(answer)

    #print(anslst)
    return anslst
                    
def gradingsectionvertical2(image, num, prex): #10, 5, 52
    (thresh, image) = cv2.threshold(image, 200, 255, cv2.THRESH_BINARY)
    anslst = []
    locy = [5, 540]
    for y in locy:
        for i in range(0, num):
            cropped = image[125+y: 540+y, (i * 375) + prex: ((i+1) * 375)]
            #cv2.imshow("cropped form", cropped) 
            #cv2.waitKey(0)
            cX = [50, 90, 140, 190]
            answer = ""
            for locx in cX:
                line = cropped[0: 480, locx-35: locx]
                ans = "A"

                arr = []
                for cnt in range(0, 12):
                    letter = line[(cnt * 35): ((cnt+1) *35) + 3, 0: 40]
                #    cv2.imshow("letter form", letter) 
                #    cv2.waitKey(0)

                    shdlvl = np.average(letter)
                    #print(shdlvl)
                    arr.append(shdlvl)
                arr.sort()

                for cnt in range(0, 12):
                    letter = line[(cnt * 35): ((cnt+1) *35) + 3, 0: 40]
                    shdlvl = np.average(letter)
                    shdavg = np.average(arr)
                    #print("avg ", shdavg)
                    if arr[0] == shdlvl and (shdlvl < (shdavg - float(shdavg * 0.25))):
                    #    print("=", shdlvl)
                        if ans == "A" and ("?" not in  answer):
                            if cnt == 0:
                                ans = "/"
                            elif cnt == 1:
                                ans = "."
                            elif cnt == 2:
                                ans = "0"
                            elif cnt == 3:
                                ans = "1"
                            elif cnt == 4:
                                ans = "2"
                            elif cnt == 5:
                                ans = "3"
                            elif cnt == 6:
                                ans = "4"
                            elif cnt == 7:
                                ans = "5"
                            elif cnt == 8:
                                ans = "6"
                            elif cnt == 9:
                                ans = "7"
                            elif cnt == 10:
                                ans = "8"
                            elif cnt == 11:
                                ans = "9"
                        else:
                            answer = "?"
                            #print("here")

                        if ans != "A":
                            answer += ans

            anslst.append(answer)

    #print(anslst)
    return anslst

def update_sat_grading(section1, section2, section3, section31, section4, section41, answer1, answer2, answer3, answer31, answer4, answer41):
    score1 = 0
    for i in range(0, 52):
        if section1[i] == answer1[i]:
            score1 = score1 + 1
    
    score2 = 0
    for i in range(0, 44):
        if section2[i] == answer2[i]:
            score2 = score2 + 1

    score3 = 0
    for i in range(0, 15):
        if section3[i] == answer3[i]:
            score3 = score3 + 1
    
    score31 = 0
    for i in range(0, 5):
        num = answer3[i].split("|")
        for j in range(0, len(num)):
            if section31[i] == num[j]:
                score31 = score31 + 1

    score4 = 0
    for i in range(0, 30):
        if section4[i] == answer4[i]:
            score4 = score4 + 1

    score41 = 0
    for i in range(0, 8):
        num = answer41[i].split("|")
        for j in range(0, len(num)):
            if section41[i] == num[j]:
                score41 = score41 + 1
    
    #print(score1, score2, score3, score31, score4, score41)
    return score1, score2, score3, score31, score4, score41

def update_sat_scale_grading(score1, score2, score3, scale1, scale2, scale3):
    reading_score = int(scale2[score1])
    writing_score = int(scale3[score2])
    math_score = int(scale1[score3])

    return (int(reading_score) + int(writing_score)) * 10, math_score