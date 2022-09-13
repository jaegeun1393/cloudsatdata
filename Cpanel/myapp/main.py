from flask import *
from werkzeug.utils import secure_filename
from werkzeug.datastructures import  FileStorage
from datetime import timedelta
from flaskext.mysql import MySQL
from flask_cors import CORS
from random import randint
from gradingSAT import *
from finalAI import satgrading
import os
import shutil

app = Flask(__name__, static_folder='../build', static_url_path='/')

app.config.from_object('config.Config')
app.permanent_session_lifetime = timedelta(minutes = 6)
app.config['SECRET_KEY'] = '_lhvudxs%wfhb-ks2vh1l+_g&y)3rw$338d)ia4j&gf&^e_y-='
#app.config['MYSQL_DATABASE_HOST'] = 'localhost'
#app.config['MYSQL_DATABASE_USER'] = 'aiden1393_root'
#app.config['MYSQL_DATABASE_PASSWORD'] = 'IB4GhjI-%z3n'
#app.config['MYSQL_DATABASE_DB'] = 'aiden1393_cloud_sat_data'

app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
app.config['MYSQL_DATABASE_USER'] = 'minfarm_ocr_admin'
app.config['MYSQL_DATABASE_PASSWORD'] = "ah6G38rjji3y"
app.config['MYSQL_DATABASE_DB'] = 'minfarm_ocr'
app.config['MYSQL_DATABASE_PORT'] = 3306
CORS(app, support_credentials=True)

db = MySQL()
db.init_app(app)

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg'}
UPLOAD_FOLDER = 'uploads/sat_answers'

def random_with_N_digits(n):
    range_start = 10**(n-1)
    range_end = (10**n)-1
    return randint(range_start, range_end)

@app.route("/")
def index():
    return app.send_static_file('index.html')

@app.route("/userchecklogin", methods=["GET", "POST"])
def check_login():
    #REMOVE
    #session["response"] = True
    if "response" in session:
        return jsonify({'message': "True"})
    else:
        return jsonify({'message': "False"})

@app.route("/uploadimg", methods=["GET", "POST"])
def check_sat_ans_sheet():
    dataimg = request.files.getlist('imgurl')
    data_sid = request.form['s_id']
    data_satid = request.form['sat_id']

    custompath = UPLOAD_FOLDER + '/' + data_sid + '/' + data_satid

    conn = db.connect()
    cur = conn.cursor()
    cur.execute('SELECT * FROM accounts WHERE s_id = %s', [data_sid])
    student_id = str(cur.fetchone())[2:-3]
    cur.execute('SELECT * FROM sat_grading_scale WHERE sat_id = %s', [data_satid])
    sat_id = str(cur.fetchone())[2:-3]
    cur.close()

    if (student_id != "" and sat_id != ""):

        if((os.path.exists(custompath)) == False):
            os.makedirs(custompath)
        else:
            shutil.rmtree(custompath)
            os.makedirs(custompath)

        conn = db.connect()
        cur = conn.cursor()
        sat_answer = []
        sat_scale = []
        cur.execute('SELECT section4 FROM sat_answer_sheet WHERE sat_id = %s', [data_satid])
        arr = str(cur.fetchone())[2:-3].split(",")
        sat_answer.append(arr)

        cur.execute('SELECT section41 FROM sat_answer_sheet WHERE sat_id = %s', [data_satid])
        arr = str(cur.fetchone())[2:-3].split(",")
        sat_answer.append(arr)

        cur.execute('SELECT section3 FROM sat_answer_sheet WHERE sat_id = %s', [data_satid])
        arr = str(cur.fetchone())[2:-3].split(",")
        sat_answer.append(arr)

        cur.execute('SELECT section31 FROM sat_answer_sheet WHERE sat_id = %s', [data_satid])
        arr = str(cur.fetchone())[2:-3].split(",")
        sat_answer.append(arr)
        
        cur.execute('SELECT section1 FROM sat_answer_sheet WHERE sat_id = %s', [data_satid])
        arr = str(cur.fetchone())[2:-3].split(",")
        sat_answer.append(arr)

        cur.execute('SELECT section2 FROM sat_answer_sheet WHERE sat_id = %s', [data_satid])
        arr = str(cur.fetchone())[2:-3].split(",")
        sat_answer.append(arr)

        cur.execute('SELECT grading1 FROM sat_grading_scale WHERE sat_id = %s', [data_satid])
        arr = str(cur.fetchone())[2:-3].split(",")
        sat_scale.append(arr)

        cur.execute('SELECT grading2 FROM sat_grading_scale WHERE sat_id = %s', [data_satid])
        arr = str(cur.fetchone())[2:-3].split(",")
        sat_scale.append(arr)

        cur.execute('SELECT grading3 FROM sat_grading_scale WHERE sat_id = %s', [data_satid])
        arr = str(cur.fetchone())[2:-3].split(",")
        sat_scale.append(arr)
        cur.close()

        eng_score=""
        mth_score=""
        sat_eng_ans1=""
        sat_eng_ans2=""
        sat_mth_ans1=""
        sat_mth_ans2=""
        sat_mth_ans3=""
        sat_mth_ans4=""
        for file in dataimg:
            if(file.filename != ''):
                filename = secure_filename(file.filename)
                file.save(os.path.join(custompath, filename))
                eng_score, mth_score, sat_eng_ans1, sat_eng_ans2, sat_mth_ans1, sat_mth_ans2, sat_mth_ans3, sat_mth_ans4 = satgrading(custompath + "//" + filename, sat_answer, sat_scale)
            #    os.remove(custompath + '/' + filename)

        conn = db.connect()
        cur = conn.cursor()
        
        cur.execute('SELECT name FROM accounts WHERE s_id = %s', [data_sid])
        student_name = str(cur.fetchone())[2:-3]

        sat_real_id = random_with_N_digits(10)
        cur.execute("INSERT INTO sat_score_result (sat_id, s_name, s_id, sat_name, english_score, math_score, sat_path, sat_en_an_1, sat_en_an_2, sat_math_an_1, sat_math_an_2, sat_math_an_3, sat_math_an_4) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (sat_real_id, student_name, data_sid, data_satid, eng_score, mth_score, custompath, sat_eng_ans1, sat_eng_ans2, sat_mth_ans1, sat_mth_ans2, sat_mth_ans3, sat_mth_ans4))
        conn.commit()

        cur.close()
        return jsonify({
            'sat_real_id': sat_real_id,
            'totalscore': int(eng_score) + int(mth_score),
            'eng_score': eng_score,
            'mth_score': mth_score,
            'sat_eng_ans1': sat_eng_ans1[1:-1],
            'sat_eng_ans2': sat_eng_ans2[1:-1],
            'sat_mth_ans1': sat_mth_ans1[1:-1],
            'sat_mth_ans2': sat_mth_ans2[1:-1],
            'sat_mth_ans3': sat_mth_ans3[1:-1],
            'sat_mth_ans4': sat_mth_ans4[1:-1]
            })
    else:
        return jsonify({'error': "Student's ID or SAT ID are not Match. Please try again."})

@app.route("/upload/sat/answer/update", methods=["GET", "POST"])
def update_sat_answer():
    data = request.get_json()
    conn = db.connect()
    cur = conn.cursor()

    cur.execute('SELECT section1 FROM sat_answer_sheet WHERE sat_id = %s', [data["sat_id"]])
    answer1 = str(cur.fetchone())[2:-3].split(',')

    cur.execute('SELECT section2 FROM sat_answer_sheet WHERE sat_id = %s', [data["sat_id"]])
    answer2 = str(cur.fetchone())[2:-3].split(',')

    cur.execute('SELECT section3 FROM sat_answer_sheet WHERE sat_id = %s', [data["sat_id"]])
    answer3 = str(cur.fetchone())[2:-3].split(',')

    cur.execute('SELECT section31 FROM sat_answer_sheet WHERE sat_id = %s', [data["sat_id"]])
    answer31 = str(cur.fetchone())[2:-3].split(',')

    cur.execute('SELECT section4 FROM sat_answer_sheet WHERE sat_id = %s', [data["sat_id"]])
    answer4 = str(cur.fetchone())[2:-3].split(',')

    cur.execute('SELECT section41 FROM sat_answer_sheet WHERE sat_id = %s', [data["sat_id"]])
    answer41 = str(cur.fetchone())[2:-3].split(',')

    score1, score2, score3, score31, score4, score41 = update_sat_grading(data["section1"].split(','), data["section2"].split(','), data["section3"].split(','), data["section31"].split(','), data["section4"].split(','), data["section41"].split(','), answer1, answer2, answer3, answer31, answer4, answer41)

    cur.execute('SELECT grading1 FROM sat_grading_scale WHERE sat_id = %s', [data["sat_id"]])
    scale1 = str(cur.fetchone())[2:-3].split(',')

    cur.execute('SELECT grading2 FROM sat_grading_scale WHERE sat_id = %s', [data["sat_id"]])
    scale2 = str(cur.fetchone())[2:-3].split(',')

    cur.execute('SELECT grading3 FROM sat_grading_scale WHERE sat_id = %s', [data["sat_id"]])
    scale3 = str(cur.fetchone())[2:-3].split(',')

    eng_score, mth_score = update_sat_scale_grading(score1, score2, score3 + score31 + score4 + score41, scale1, scale2, scale3)

    cur.execute('UPDATE sat_score_result SET english_score=%s, math_score=%s, sat_en_an_1=%s, sat_en_an_2=%s, sat_math_an_1=%s, sat_math_an_2=%s, sat_math_an_3=%s, sat_math_an_4=%s WHERE sat_id=%s', 
        (str(eng_score), str(mth_score), str(data["section1"].split(',')), str(data["section2"].split(',')), str(data["section3"].split(',')), str(data["section31"].split(',')), str(data["section4"].split(',')), str(data["section41"].split(',')), data["sat_real_id"]))
    conn.commit()

    cur.close()
    return jsonify({
        'sat_total': eng_score + mth_score,
        'eng_score': eng_score,
        'mth_score': mth_score
        })

@app.route("/updateacc", methods=["GET", "POST"])
def adduser():
    data = request.get_json()
    conn = db.connect()
    cur = conn.cursor()
    cur.execute("INSERT INTO accounts (id, name, password, s_id, role) VALUES(%s, %s, %s, %s, %s)", (data["id"], data["name"], data["password"], random_with_N_digits(5), "student"))
    conn.commit()
    cur.close()
    return jsonify({'success': "Successfully register to the website."})

@app.route("/student_dashboard_overview", methods=["GET", "POST"])
def getname():
    #REMOVE
    #session['user_name'] = "Jaegeun Oh"

    conn = db.connect()
    cur = conn.cursor()
    cur.execute('SELECT s_id FROM accounts WHERE name = %s', [session["user_name"]])
    sid = str(cur.fetchone())[2:-3]

    cur.execute('SELECT sat_name FROM sat_score_result WHERE s_id = %s', [sid])
    satname = cur.fetchall()
    satnamelst = [str(list(i))[2:-2] for i in satname]

    cur.execute('SELECT sat_id FROM sat_score_result WHERE s_id = %s', [sid])
    satid = cur.fetchall()
    satidlst = [str(list(i))[2:-2] for i in satid]

    cur.execute('SELECT english_score FROM sat_score_result WHERE s_id = %s', [sid])
    engscore = cur.fetchall()
    engscorelst = [str(list(i))[2:-2] for i in engscore]

    cur.execute('SELECT math_score FROM sat_score_result WHERE s_id = %s', [sid])
    mthscore = cur.fetchall()
    mthscorelst = [str(list(i))[2:-2] for i in mthscore]

    cur.close()
    
    return jsonify({
        's_name': session['user_name'],
        's_id': sid,
        'sat_name': satnamelst,
        'sat_id': satidlst,
        'eng_sc': engscorelst,
        'mth_sc': mthscorelst
        })

@app.route("/get_user_name", methods=["GET", "POST"])
def getstudetnid():
    #REMOVE
    #session['user_name'] = "geun"
    
    return jsonify({
        'name': session['user_name']
        })

@app.route("/get_user_role", methods=["GET", "POST"])
def getrole():
    #REMOVE
    #session['user_name'] = "geun"

    conn = db.connect()
    cur = conn.cursor()
    cur.execute('SELECT role FROM accounts WHERE name = %s', [session["user_name"]])
    role = str(cur.fetchone())[2:-3]
    cur.close()
    return jsonify({'role': role})

@app.route("/get/student/info", methods=["GET", "POST"])
def get_all_info_byid():
    data = request.get_json()
    conn = db.connect()
    cur = conn.cursor()

    cur.execute('SELECT name FROM accounts WHERE s_id = %s', [data["s_id"]])
    sname = str(cur.fetchone())[2:-3]

    cur.execute('SELECT sat_name FROM sat_score_result WHERE s_id = %s', [data["s_id"]])
    satname = cur.fetchall()
    satnamelst = [str(list(i))[2:-2] for i in satname]

    cur.execute('SELECT sat_id FROM sat_score_result WHERE s_id = %s', [data["s_id"]])
    satid = cur.fetchall()
    satidlst = [str(list(i))[2:-2] for i in satid]

    cur.execute('SELECT english_score FROM sat_score_result WHERE s_id = %s', [data["s_id"]])
    engscore = cur.fetchall()
    engscorelst = [str(list(i))[2:-2] for i in engscore]

    cur.execute('SELECT math_score FROM sat_score_result WHERE s_id = %s', [data["s_id"]])
    mthscore = cur.fetchall()
    mthscorelst = [str(list(i))[2:-2] for i in mthscore]

    cur.close()

    return jsonify({
        's_name': sname,
        'sat_name': str(satnamelst)[1:-1],
        'sat_id': satidlst,
        'eng_sc': engscorelst,
        'mth_sc': mthscorelst
        })

@app.route("/get/sat/score/id", methods=["GET", "POST"])
def get_sat_info_byid():
    data = request.get_json()
    conn = db.connect()
    cur = conn.cursor()

    cur.execute('SELECT english_score FROM sat_score_result WHERE sat_id = %s', [data["sat_id"]])
    eng_score = str(cur.fetchone())[2:-3]

    cur.execute('SELECT math_score FROM sat_score_result WHERE sat_id = %s', [data["sat_id"]])
    mth_score = str(cur.fetchone())[2:-3]

    cur.execute('SELECT sat_en_an_1 FROM sat_score_result WHERE sat_id = %s', [data["sat_id"]])
    eng1 = cur.fetchall()
    eng1_lst = [str(list(i))[2:-2] for i in eng1]

    cur.execute('SELECT sat_en_an_2 FROM sat_score_result WHERE sat_id = %s', [data["sat_id"]])
    eng2 = cur.fetchall()
    eng2_lst = [str(list(i))[2:-2] for i in eng2]

    cur.execute('SELECT sat_math_an_1 FROM sat_score_result WHERE sat_id = %s', [data["sat_id"]])
    mth1 = cur.fetchall()
    mth1_lst = [str(list(i))[2:-2] for i in mth1]

    cur.execute('SELECT sat_math_an_2 FROM sat_score_result WHERE sat_id = %s', [data["sat_id"]])
    mth2 = cur.fetchall()
    mth2_lst = [str(list(i))[2:-2] for i in mth2]

    cur.execute('SELECT sat_math_an_3 FROM sat_score_result WHERE sat_id = %s', [data["sat_id"]])
    mth3 = cur.fetchall()
    mth3_lst = [str(list(i))[2:-2] for i in mth3]

    cur.execute('SELECT sat_math_an_4 FROM sat_score_result WHERE sat_id = %s', [data["sat_id"]])
    mth4 = cur.fetchall()
    mth4_lst = [str(list(i))[2:-2] for i in mth4]

    cur.close()

    return jsonify({
        'totalscore': int(eng_score) + int(mth_score),
        'eng_score': eng_score,
        'mth_score': mth_score,
        'sat_eng_ans1': str(eng1_lst)[3:-3],
        'sat_eng_ans2': str(eng2_lst)[3:-3],
        'sat_mth_ans1': str(mth1_lst)[3:-3],
        'sat_mth_ans2': str(mth2_lst)[3:-3],
        'sat_mth_ans3': str(mth3_lst)[3:-3],
        'sat_mth_ans4': str(mth4_lst)[3:-3]
        })

@app.route("/get/student/id", methods=["GET", "POST"])
def search_student_by_loginid():
    data = request.get_json()

    conn = db.connect()
    cur = conn.cursor()
    cur.execute("SELECT s_id FROM accounts WHERE id=%s", [data["id"]])
    sid = str(cur.fetchone())[2:-3]
    cur.close()
    return jsonify({'message': sid})

@app.route("/userLogin", methods=["GET", "POST"])
def login():
    data = request.get_json()
    conn = db.connect()
    cur = conn.cursor()
    cur.execute('SELECT password FROM accounts WHERE id = %s', [data["id"]])
    pwd = str(cur.fetchone())[2:-3]
    cur.close()
    if (pwd == data["password"]):
        session["response"] = data
        
        conn = db.connect()
        cur = conn.cursor()
        cur.execute('SELECT name FROM accounts WHERE id = %s', [data["id"]])
        name = str(cur.fetchone())[2:-3]
        cur.execute('SELECT s_id FROM accounts WHERE id = %s', [data["id"]])
        s_id = str(cur.fetchone())[2:-3]
        cur.close()
        session["user_name"] = name

        return jsonify({'message': "Successfully register to the website.",
        'login': "True"})
    return jsonify({'message': "Wrong password.",
        'login': "False"})

@app.route("/logout", methods=["GET", "POST"])
def check_logout():
    session.pop('response', None)
    session.pop('user_name', None)
    return jsonify({'message': "Successfully logout from the website."})

@app.route("/addsat", methods=["GET", "POST"])
def addsat():
    data = request.get_json()
    conn = db.connect()
    cur = conn.cursor()
    cur.execute("INSERT INTO sat_answer_sheet (sat_id, section1, section2, section3, section31, section4, section41) VALUES(%s, %s, %s, %s, %s, %s, %s)", (data["satname"], data["section1"][0:-1], data["section2"][0:-1], data["section3"][0:-1], data["section31"][0:-1], data["section4"][0:-1], data["section41"][0:-1]))
    conn.commit()

    cur.close()
    return jsonify({'success': "Successfully add the SAT to the server, please refresh the website."})

if __name__=="__main__":
    app.run(debug=True)