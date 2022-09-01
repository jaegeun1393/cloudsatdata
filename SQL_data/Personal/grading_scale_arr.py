arr1 = ""
arr2 = ""
arr3 = ""
arr4 = ""
inp = ""
val = ""
while val != "end":
    val = input("Enter your value: ")
    if val != "end":
        inp = val.split(" ")
        if len(inp) == 4:
            arr1 = arr1 + inp[0] + ","
            arr2 = arr2 + inp[1] + ","
            arr3 = arr3 + inp[2] + ","
            arr4 = arr4 + inp[3] + ","
        elif len(inp) == 3:
            arr1 = arr1 + inp[0] + ","
            arr2 = arr2 + inp[1] + ","
            arr3 = arr3 + inp[2] + ","
        else:
            arr1 = arr1 + inp[0] + ","
            arr2 = arr2 + inp[1] + ","

print(arr1 + "\n\n")
print(arr2 + "\n\n")
print(arr3 + "\n\n")
print(arr4 + "\n\n")