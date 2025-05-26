import Papa from 'papaparse';
import React, { useEffect, useState } from 'react';
import List from "./List";
import Charts from './Charts';
import ScoreSpectrumChart from "./ScoreSpectrumChart";

const filePath = (subject) => `/7a9/assets/${subject}.csv`;

const upArrow = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#007BFF" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4L6 10H10V20H14V10H18L12 4Z"/>
    </svg>
);

const downArrow = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 20L18 14H14V4H10V14H6L12 20Z" fill="currentColor"/>
    </svg>
);

function formatName(fullName) {
    if (!fullName) return '';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length < 2) return fullName;
    const lastTwo = parts.slice(-1).join(' ');
    const initials = parts.slice(0, -1).map(p => p[0]).join('');
    return `${lastTwo} ${initials}`;
}

function App() {
    const [subject, setSubject] = useState('math');
    const [allStudents, setAllStudents] = useState([]);
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [classFilter, setClassFilter] = useState('');
    const [ascending, setAscending] = useState(true);
    const [filteredStudent, setFilteredStudent] = useState('');

    useEffect(() => {
        Papa.parse(filePath(subject), {
            header: true,
            delimiter: ",",
            download: true,
            complete: (results) => {
                const parsedData = results.data.map(row => {
                    row.score = parseFloat(row.score);
                    row.name = formatName(row.name);
                    return row;
                });

                const classesSet = new Set(parsedData.map(student => student.class));
                const x = [];
                for (const className of classesSet) {
                    const studentsOfClass = parsedData.filter(student => student.class === className);
                    x.push({
                        name: className,
                        students: studentsOfClass,
                        score: studentsOfClass.reduce((sum, student) => sum + parseFloat(student.score || 0), 0) / studentsOfClass.length || 0,
                    });
                }

                setClasses(x);
                setAllStudents(parsedData.sort((a, b) => ascending ? a.score - b.score : b.score - a.score));
            },
            error: (error) => {
                console.error("Error parsing CSV file:", error);
            },
        });
    }, [ascending, subject]);

    useEffect(() => {
        if (classFilter) {
            const filteredStudents = [...allStudents].filter(student => student.class === classFilter);
            setStudents(filteredStudents);
        } else {
            setStudents(allStudents);
        }
    }, [classFilter, allStudents, setStudents]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Kết quả kì thi Olympic T5-2025</h1>
            <div>
                Môn:
                <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                    <option value="math">Toán</option>
                    <option value="english">Tiếng Anh</option>
                    <option value="literature">Văn</option>
                </select>
                <span style={{ marginLeft: '10px' }}>Lớp: </span>
                <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
                    <option value="">-- Tất cả --</option>
                    {(classes || []).map((obj, index) => (
                        <option key={index} value={obj.name}>
                            {obj.name} ({obj.students.length} students)
                        </option>
                    ))}
                </select>
                <span style={{ marginLeft: '10px' }}>Đang chọn: </span>
                <strong style={{ color: 'green' }}>{classFilter}</strong>
                <input
                    value={filteredStudent}
                    onChange={(e) => setFilteredStudent(e.target.value)}
                    placeholder="Filter by student name"
                    style={{ marginLeft: '10px' }}
                />
            </div>

            <h2>
                Có <span style={{ color: 'blue' }}>{allStudents.length}</span> hs |{' '}
                <span style={{ color: 'blue' }}>{classes.length}</span> lớp
            </h2>

            {!classFilter && (
                <div>
                    <h2>So sánh ĐTB giữa các lớp</h2>
                    <ScoreSpectrumChart
                        students={[...classes]
                            .map((g) => ({
                                name: `${g.name} (${g.students.length})`,
                                score: g.score,
                            }))
                            .sort((a, b) => b.score - a.score)}
                    />
                    <hr />
                </div>
            )}

            <h2>Biểu đồ</h2>
            <Charts students={students} classFilter={classFilter} />
            <hr />

            <h2>
                Danh sách học sinh
                <span onClick={() => setAscending(!ascending)} style={{ cursor: "pointer" }}>
          {ascending ? upArrow : downArrow}
        </span>
            </h2>
            <List students={students} classFilter={classFilter} filteredStudent={filteredStudent} />
        </div>
    );
}

export default App;