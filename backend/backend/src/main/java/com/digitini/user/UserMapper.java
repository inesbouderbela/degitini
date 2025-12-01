package com.digitini.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    
    @Mapping(target = "cinNumber", source = "cin")
    @Mapping(target = "lastLoginAt", source = "lastLogin")
    UserDto toDto(User user);
    
    @Mapping(target = "cin", source = "cinNumber")
    @Mapping(target = "lastLogin", source = "lastLoginAt")
    User toEntity(UserDto userDto);
}