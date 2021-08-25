package com.example.springsecuritytest.domain.entity;

import com.example.springsecuritytest.dto.CategoryDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@SequenceGenerator(
        name = "CATEGORY_SEQ_GEN",
        sequenceName = "CATEGORY_SEQ",
        allocationSize = 1
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@Table(name = "CATEGORY")
public class CategoryEntity {

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "CATEGORY_SEQ_GEN")
    private Long id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 200)
    private String description;

    @OneToMany(mappedBy = "categoryId") // Bbs의 categoryId와 관계 매핑
    private Set<BbsEntity> bbsEntities = new HashSet<>();

    public void addBbs(BbsEntity bbs) {
        bbs.setCategory(this);
        this.bbsEntities.add(bbs);
    }

    public CategoryDto toDto() {
        return CategoryDto.builder()
                .id(id)
                .name(name)
                .description(description)
                .build();
    }

    @Builder
    public CategoryEntity(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
