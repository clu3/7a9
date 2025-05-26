import React from 'react';

const List = ({ students, classFilter = '', filteredStudent ='' }) => {
    const tableStyle = {
        borderCollapse: 'collapse',
        border: '1px solid black',
    };

    const cellStyle = {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'left',
    };

    const total = students.length;
    return (
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th  style={cellStyle}>#</th>
                    <th  style={cellStyle}>STT</th>
                    <th  style={cellStyle}>SBD</th>
                    <th  style={cellStyle}>Tên HS</th>
                    <th  style={cellStyle}>Lớp</th>
                    <th  style={cellStyle}>Điểm</th>
                    <th  style={cellStyle}>Bằng điểm</th>
                    <th  style={cellStyle}>Kém điểm</th>
                    <th  style={cellStyle}>Hơn điểm</th>
                    <th  style={cellStyle}>Xếp hạng</th>
                </tr>
            </thead>
            <tbody>
            {students.map((student, index) => {
                const lessScore = [...students].filter(s => s.score < student.score).length;
                const moreScore = [...students].filter(s => s.score > student.score).length;
                const sameScore = [...students].filter(s => s.score == student.score).length;

                if (student.score == 17.25) {
                    console.log([...students].filter(s => s.score > student.score))
                }
                return (
                    <tr key={index}>
                        <td style={cellStyle}>{index + 1}</td>
                        <td style={cellStyle}>{student.stt}</td>
                        <td style={cellStyle}>{student.code}</td>
                        <td style={cellStyle}>
                        <span style={{
                            color: filteredStudent && student.name.toLowerCase().indexOf(filteredStudent.toLowerCase()) != -1 ? 'red' : 'black',
                            fontSize: '120%'
                        }}>
                        {student.name}
                        </span>
                        </td>
                        <td style={cellStyle}>
                            {student.class}
                        </td>
                        <td style={cellStyle}>
                            <strong style={{paddingLeft: '15px', color: 'red', fontSize: '100%'}}>{student.score}</strong>
                        </td>
                        <td style={cellStyle} title={'Number of students with Same score'}>
                            {sameScore}
                        </td>
                        <td style={cellStyle} title={'Number of students Less than this score'}>
                            {lessScore}
                        </td>
                        <td style={cellStyle} title={'Number of students Better than this student'}>
                            {moreScore}
                        </td>
                        <td style={cellStyle} title={'ranking'}>
                            {moreScore+sameScore} / {total}
                        </td>
                    </tr>
                );
            })}
            </tbody>
    </table>

);
}

export default List;