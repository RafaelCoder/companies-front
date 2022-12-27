import { Input, TextInput, Button, Group, Box, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import RoleAPIService from '../../services/RoleAPIService.js';
import EmployeeAPIService from '../../services/EmployeeAPIService.js';
import { useNavigate, useParams } from 'react-router-dom';
import CompanyAPIService from '../../services/CompanyAPIService.js';


export default function Employee(){
    let { idCompany, idEmployee } = useParams();

    const navigate = useNavigate();

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [role, setRole] = useState(1);
    const [salary, setSalary] = useState('');
    const [roles, setRoles] = useState([]);
    const [company, setCompany] = useState({name: ''});

    let api = RoleAPIService.getInstance();
    let employeeApi = EmployeeAPIService.getInstance();
    let companyApi = CompanyAPIService.getInstance();

    useEffect(
        () => {
            api.getRoles((res) => {
                setRoles(res);
            });

            companyApi.getCompany(idCompany, (res) =>{
                console.log(res);
                setCompany(res);
            });

            loadData();

            
        }, []
    );

    let loadData = () =>{
        employeeApi.get(idCompany, idEmployee, (data) => {
            setId(0);
            if(!data) return;
            setId(data.id);
            setName(data.name);
            setRole(data.role.id);
            setSalary(data.salary);
        });
    }

    let handleSubmit = (evt) => {
        evt.preventDefault();

        let employee = {
            name: name,
            role: {
                id: role
            },
            salary: salary
        }
        if(id){
            employee = {...employee, id: id}
            employeeApi.update(idCompany, employee, (res) => {
                onSucess();
            });
        } else {
            employeeApi.create(idCompany, employee, (res) => {
                onSucess();
            });
        }
    }

    let onSucess = () => {
        navigate(-1);
    }

    return (
        <>
        <h1>Cadastro de funcionário</h1>
        <h2>Empresa {company.name}</h2>

        <Box sx={{ maxWidth: 600 }} mx="auto">
            <form onSubmit={(evt) => handleSubmit(evt)}>
                <TextInput
                    withAsterisk
                    label="Nome"
                    placeholder="Nome"
                    value={name}
                    onChange={evt => setName(evt.target.value)}
                    required
                />

                <Select
                    label="Cargo"
                    placeholder="Selecione"
                    data={roles.map(r => ({value: r.id, label: r.name, key: r.id}))}
                    value={role}
                    onChange={setRole}
                    required
                />

                <Input.Wrapper label="Salário" required>
                    <Input
                        type="number"
                        value={salary}
                        onChange={evt => setSalary(evt.target.value)}
                        alwaysShowMask
                        required
                        min={1}
                        step="any"
                    />
                </Input.Wrapper>

                <Group position="right" mt="md">
                    <Button type="submit">Gravar</Button>
                </Group>
            </form>
        </Box>
        </>
    );
}