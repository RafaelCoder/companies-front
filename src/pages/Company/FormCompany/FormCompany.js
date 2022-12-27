import { useNavigate } from "react-router-dom";
import { TextInput, Divider , Button, Group, Box, Input } from '@mantine/core';
import InputMask from "react-input-mask";
import { useState, useEffect } from 'react';
import ViaCEPAPIService from '../../../services/ViaCEPAPIService';
import CompanyAPIService from '../../../services/CompanyAPIService.js';

export default function FormCompany({company}){
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [zipCodeFind, setZipCodeFind] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [complement, setComplement] = useState('');

    useEffect(
        ()=>{
            populateFields();
        }, [company]);

    const navigate = useNavigate();

    let zipCodeAPI = ViaCEPAPIService.getInstance();
    let companyApi = CompanyAPIService.getInstance();

    

    let populateFields = () =>{
        if(!company) return;
        setId(company?.id ?? '');
        setName(company?.name);
        setPhone(company?.phone);
        setZipCode(company?.address?.zipCode ?? '');
        setStreet(company?.address?.street ?? '');
        setNumber(company?.address?.number ?? '');
        setNeighborhood(company?.address?.neighborhood ?? '');
        setCity(company?.address?.city ?? '');
        setState(company?.address?.state ?? '');
        setComplement(company?.address?.complement ?? '');
    }

    let getAddresByZipCode = () => {
        let _zipCode = zipCode.trim().replace(/\D/g, "");;

        if(_zipCode.length !== 8)
            return;

        if(zipCodeFind === _zipCode)
            return;
        
        zipCodeAPI.findCep(zipCode,
            (res) => {
                setStreet(res.street);
                setNeighborhood(res.neighborhood);
                setCity(res.city);
                setState(res.state);
                setZipCodeFind(_zipCode);
            }
        );
            
    }

    let onSuccess = () => {
        alert('sucesso');
        navigate('/companies');
    }

    let handleSubmit = (evt) => {
        evt.preventDefault();
        
        let newCompany = {
            name: name,
            phone: phone,
            address: {
                zipCode: zipCode,
                street: street,
                number: number,
                neighborhood: neighborhood,
                city: city,
                state: state,
                complement: complement
            }
        };
        if(id !== ''){
            newCompany = {...newCompany, id: id};
            companyApi.putCompany(newCompany, ()=> {
                onSuccess();
            });
        } else {
            companyApi.postCompany(newCompany, ()=> {
                onSuccess();
            });
        }
    }
    return(
        <Box sx={{ maxWidth: 600 }} mx="auto">
            <form onSubmit={(evt) => handleSubmit(evt)}>
                <TextInput
                    label="Id"
                    placeholder="Id"
                    value={id}
                    onChange={evt => setId(evt.target.value)}
                    readOnly
                    disabled
                />

                <TextInput
                    withAsterisk
                    label="Nome"
                    placeholder="Nome"
                    value={name}
                    onChange={evt => setName(evt.target.value)}
                    autoFocus
                    required
                />

                <Input.Wrapper label="Telefone" required>
                    <Input
                        component={InputMask}
                        mask="(99) 9999-9999"
                        placeholder="Informe seu telefone"
                        value={phone}
                        onChange={evt => setPhone(evt.target.value)}
                    />
                </Input.Wrapper>

                <Divider my="sm" />

                
                <Input.Wrapper label="CEP" required>
                    <Input
                        component={InputMask}
                        mask="99999-99"
                        placeholder="00000-00"
                        onBlur={() => getAddresByZipCode()}
                        value={zipCode}
                        onChange={evt => setZipCode(evt.target.value)}
                        required
                    />
                </Input.Wrapper>
                
                <TextInput
                    withAsterisk
                    label="Logradouro"
                    placeholder="Rua ..."
                    value={street}
                    onChange={evt => setStreet(evt.target.value)}
                    required
                />

                <TextInput
                    withAsterisk
                    label="Número"
                    placeholder="000"
                    size="sm"
                    value={number}
                    onChange={evt => setNumber(evt.target.value)}
                    required
                />

                <TextInput
                    withAsterisk
                    label="Bairro"
                    placeholder=""
                    value={neighborhood}
                    onChange={evt => setNeighborhood(evt.target.value)}
                    required
                />

                <TextInput
                    withAsterisk
                    label="Cidade"
                    placeholder=""
                    value={city}
                    onChange={evt => setCity(evt.target.value)}
                    required
                />

                <TextInput
                    label="Estado"
                    placeholder=""
                    value={state}
                    onChange={evt => setState(evt.target.value)}
                    required
                />

                <TextInput
                    withAsterisk
                    label="Complemento"
                    placeholder=""
                    value={complement}
                    onChange={evt => setComplement(evt.target.value)}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Gravar</Button>
                </Group>
            </form>
        </Box>
    );
}