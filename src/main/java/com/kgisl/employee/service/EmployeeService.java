package com.kgisl.employee.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kgisl.employee.dto.EmployeeDTO;
import com.kgisl.employee.dto.UpdateEmployeeDTO;
import com.kgisl.employee.entity.Employee;
import com.kgisl.employee.repository.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
    private final Logger logger = LoggerFactory.getLogger(EmployeeService.class);
		
	public List<Employee> getAll() {
		List<Employee> employees = employeeRepository.findAll();
		
        logger.info("List of all employees: " + employees);

        return employees;
	}
	
	public Optional<Employee> getById(Integer id) {
		return employeeRepository.findById(id);
	}
	
	public Employee insert(Employee e) {
		return employeeRepository.save(e);
	}

	public void updateEmployee( EmployeeDTO emp,Integer id) {
		
		Optional<Employee> optionalEmp = employeeRepository.findById(id);
		if(optionalEmp.isPresent()) {
			Employee existingEmp = optionalEmp.get();
			
			existingEmp.setEmployeeName(emp.getEmployeeName());
			existingEmp.setMobile(emp.getMobile());
			existingEmp.setAddress(emp.getAddress());
			existingEmp.setDepartment(emp.getDepartment());
			existingEmp.setDesignation(emp.getDesignation());
			existingEmp.setEmail(emp.getEmail());
			existingEmp.setEmployeeCode(emp.getEmployeeCode());
			
			employeeRepository.save(existingEmp);
		}
		else {
			System.out.println("Error occurs while updating");
		}
		
	}

	
	public void delete(Integer id) {
		employeeRepository.deleteById(id);
	}
}
