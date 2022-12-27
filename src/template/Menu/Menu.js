import { IconHome2, IconBuilding  } from '@tabler/icons';
import { Navbar, NavLink } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Menu(){
  const data = [
    { icon: IconHome2, label: 'Inicio', to: "/" },
    { icon: IconBuilding, label: 'Empresas', to: "/companies" },
  ];

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={false}
      label={item.label}
      icon={<item.icon size={16} stroke={1.5} />}
      component={Link}
      variant="link"
      to={item.to}
    />
  ));

  return <Navbar  width={{ base: 200 }}  p="xs">{items}</Navbar>;
}