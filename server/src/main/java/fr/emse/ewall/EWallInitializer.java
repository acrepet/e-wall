package fr.emse.ewall;

import javax.annotation.PostConstruct;

import fr.emse.ewall.model.Authority;
import fr.emse.ewall.model.Category;
import fr.emse.ewall.model.Role;
import fr.emse.ewall.repository.AuthorityRepository;
import fr.emse.ewall.repository.CategoryRepository;
import fr.emse.ewall.service.category.CategoryService;
import fr.emse.ewall.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Initialize data if db is empty
 */
@Component
public class EWallInitializer {

    private static final Logger logger = LoggerFactory.getLogger(EWallInitializer.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private UserService userService;

    @PostConstruct
    @Transactional
    public void init() {
        if(categoryRepository.count()==0){
            logger.info("This is the first start of the application. We create the different categories");

            categoryService.save(new Category().setCode("territoire").setName("Territoire(s)").setShortCode("F"));
            categoryService.save(new Category().setCode("international").setName("International").setShortCode("U"));
            categoryService.save(new Category().setCode("rechindustrie").setName("Transfert recherche - industrie").setShortCode("T"));
            categoryService.save(new Category().setCode("orgatravail").setName("Organisation du travail").setShortCode("U"));
            categoryService.save(new Category().setCode("responsabilite").setName("Responsabilité sociétale et environnementale de l’ingénieur").setShortCode("R"));

            authorityRepository.save(new Authority().setId(1L).setName(Role.PUBLIC));
            authorityRepository.save(new Authority().setId(2L).setName(Role.ADMIN));
            authorityRepository.save(new Authority().setId(3L).setName(Role.WRITER));

            userService.findOrCreateUser("agnes.crepet", Role.PUBLIC, Role.WRITER, Role.ADMIN);

        }
    }

}
