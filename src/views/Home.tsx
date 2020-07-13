import React, {useState} from 'react';

interface Member {
    id: number,
    name: string,
    email: string,
    role: string,
    avatar: string,
    active: boolean,
}

const Home = (props: any) => {
    const [members, setMembers] = useState([
        {
            id: 1,
            name: 'Erica Badu',
            email: 'e.badu@example.com',
            role: 'Owner',
            avatar: 'erica.png',
            active: true,
        },
        {
            id: 2,
            name: 'Amy Namy',
            email: 'a.namy@example.com',
            role: 'Standard',
            avatar: 'amy.png',
            active: true,
        },
        {
            id: 3,
            name: 'Olly',
            email: 'o.hunter@example.com',
            role: 'Standard',
            avatar: 'olly.png',
            active: true,
        }
    ]);
    const names: string[] = [
        'Vanessa Gross',
        'Veronica Mills',
        'Valda Malone',
        'Piers Wells',
        'Peter Jimenez',
    ];
    const roles: string[] = [
        'Admin',
        'Standard',
    ];

    const generateUser = (active: boolean) => {
        const randomRole = roles[Math.floor(Math.random() * roles.length)];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const firstLetter = randomName.charAt(0).toLowerCase();

        return {
            id: members.length + 1,
            name: randomName,
            email: `${firstLetter + '.' + randomName.split(" ")[1].toLowerCase()}@example.com`,
            role: randomRole,
            avatar: `${firstLetter}.png`,
            active: active,
        };
    }

    const addMember = () => {
        setMembers([
            ...members,
            generateUser(true),
        ]);
    };

    const inviteMember = () => {
        setMembers([
            ...members,
            generateUser(false),
        ]);
    };

    const deleteMember = (id: number) => {
        setMembers(members.filter((value : Member) => value.id !== id));
    };

    return (
        <div className="home">
            <div className="container">
                <header>
                    <h1>Members</h1>
                    <div
                        className="add-button"
                        onClick={() => addMember()}
                    >
                        <span>+</span>
                    </div>
                </header>

                <div className="table-wrapper">
                    <table width="100%">
                        <thead>
                            <tr>
                                <th>Team member</th>
                                <th>Email</th>
                                <th>Permission level</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {members ? members.map((value : Member, index : number) => (
                                <tr>
                                    <td>
                                        <div className="member-wrapper">
                                            <div className="avatar">
                                                <img src={value.active ? `/avatars/${value.avatar}` : '/avatars/pending.png'} alt={value.name} />
                                            </div>
                                            <span>{value.active ? value.name : 'Pending acceptance'}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {value.email}
                                    </td>
                                    <td>
                                        {value.role}
                                    </td>
                                    <td>
                                        <div
                                            className="delete-button"
                                            onClick={() => deleteMember(value.id)}
                                        >
                                            <img src="/images/trash.png" alt="Trash" />
                                        </div>
                                    </td>
                                </tr>
                            )) : null}
                        </tbody>
                    </table>
                    <div className="info-block">
                        <span>Your team has {`${members ? members.filter((value : Member) => value.active).length : 0}/${members.length}`} active members.</span>
                        <div
                            className="invite-button"
                            onClick={() => inviteMember()}
                        >
                            <img src="/images/add.png" alt="Add" />
                            <span>Invite</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;