package com.kgisl.employee.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.kgisl.employee.dto.EmployeeDTO;
import com.kgisl.employee.dto.UpdateEmployeeDTO;
import com.kgisl.employee.entity.Employee;
import com.kgisl.employee.entity.TechnicalSkill;
import com.kgisl.employee.service.EmployeeService;

@Controller
@RequestMapping("/employee")
@CrossOrigin("http://localhost:4200/*")
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;

	private final Logger logger = LoggerFactory.getLogger(EmployeeService.class);

	@GetMapping("/")
	public ResponseEntity<List<EmployeeDTO>> getAllEmployee() {
		List<Employee> employees = employeeService.getAll();

		List<EmployeeDTO> employeeDTOs = employees.stream().map(employee -> {
			EmployeeDTO dto = new EmployeeDTO();
			dto.setId(employee.getId());
			dto.setEmployeeName(employee.getEmployeeName());
			dto.setMobile(employee.getMobile());
			dto.setGender(employee.getGender());
			dto.setAddress(employee.getAddress());
			dto.setEmployeeCode(employee.getEmployeeCode());
			dto.setDepartment(employee.getDepartment());
			dto.setDesignation(employee.getDesignation());
			dto.setEmail(employee.getEmail());
			dto.setTechnicalSkills(employee.getTechnicalSkills());

			logger.info("List of all DTO: " + dto);
			return dto;
		}).collect(Collectors.toList());

		return new ResponseEntity<>(employeeDTOs, HttpStatus.OK);
	}


	@GetMapping("getbyid/{id}")
	public ResponseEntity< Optional<Employee>> getEmployeeById(@PathVariable Integer id) {
		Optional<Employee> employee = employeeService.getById(id);
		System.out.println("Get employee " + employee);
		return employee.map(empployee -> ResponseEntity.ok(employee))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
	}

	@PostMapping("/")
	public ResponseEntity<Employee> createEmployee(@RequestPart("employeeData") Map<String, Map<String, Object>> formData,@RequestPart("file") MultipartFile file) {
		try {

			Map<String, Object> personalInfoData = formData.get("personalInfo");
			Map<String, Object> employeeDetailsData = formData.get("employeeDetails");

			Employee employee = new Employee();

			List<String> technicalSkillNames = (List<String>) personalInfoData.get("technicalSkills");
			List<TechnicalSkill> technicalSkills = technicalSkillNames.stream().map(skillName -> {
				TechnicalSkill technicalSkill = new TechnicalSkill();
				technicalSkill.setSkill(skillName);
				technicalSkill.setEmployee(employee);
				return technicalSkill;
			}).collect(Collectors.toList());

			employee.setEmployeeName((String) personalInfoData.get("employeeName"));
			employee.setMobile((String) personalInfoData.get("mobile"));
			employee.setGender((String) personalInfoData.get("gender"));
			employee.setTechnicalSkills(technicalSkills);

			employee.setAddress((String) personalInfoData.get("address"));

			employee.setEmployeeCode((String) employeeDetailsData.get("employeeCode"));
			employee.setDepartment((String) employeeDetailsData.get("department"));
			employee.setDesignation((String) employeeDetailsData.get("designation"));
			employee.setEmail((String) employeeDetailsData.get("email"));
			System.out.println("Employee request:" + employee);

			if (file != null) {
				byte[] fileData = file.getBytes();
				employee.setEmployeeFile(fileData);
			}

			Employee l = employeeService.insert(employee);
			System.out.println("EmployeeService list:" + l);

			return new ResponseEntity<>(l, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	
	@PutMapping("update/{id}")
	public ResponseEntity<String> updateEmployee(@RequestBody EmployeeDTO updateEmployee, @PathVariable int id) {
    	try {
    		employeeService.updateEmployee(updateEmployee, id);
       	 return ResponseEntity.status(HttpStatus.valueOf(200)).body("Emplolyee_detail Updated Successfully");
    		
    	}catch (Exception ex) {
    	    System.out.println(ex.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occur");
    		
    	}
	}

	@DeleteMapping("delete/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable int id) {
	    try {
	        employeeService.delete(id);
	        return ResponseEntity.status(HttpStatus.OK).body("Employee deleted successfully");
	    } catch (Exception ex) {
	        System.out.println(ex.getMessage());
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred while deleting employee");
	    }
	}
	
	

}
