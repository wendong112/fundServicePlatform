package com.tc.fundService.service.impl;

import com.tc.fundService.entity.defect.PropertyValue;
import com.tc.fundService.mapper.defect.PropertyValueMapper;
import com.tc.fundService.service.PropertyValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyValueImpl implements PropertyValueService {
    @Autowired
    private PropertyValueMapper propertyValueMapper;

    @Override
    public List<PropertyValue> getAllVersion() {
        return propertyValueMapper.getAllVersion();
    }

    @Override
    public List<PropertyValue> getMainVersion() {
        return propertyValueMapper.getMainVersion();
    }

    @Override
    public List<PropertyValue> getAllModule() {
        return propertyValueMapper.getAllModule();
    }

    @Override
    public List<PropertyValue> getHeavySeverity() {
        return propertyValueMapper.getHeavySeverity();
    }
}
