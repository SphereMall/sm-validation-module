# SphereMall From Validation Module
### Version 1.0.0

## Usage
Include Validation Module on your page

```html
<!-- Full size file -->
<script src="https://github.com/SphereMall/sm-validation-module/blob/master/js/validation.module.js" type="text/
javascript"></script>

<!-- Minimized file -->
<script src="https://github.com/SphereMall/sm-validation-module/blob/master/js/validation.module.min.js" type="text/
javascript"></script>
```
    
### Form validation
Validation is initialized when script find at least one element in form with `data-validation-sm` attribute
```html
<form>
    <input type="text" name="name"
           data-validation-sm="required"/>
           
    <input type="text" name="surname"
           data-validation-sm="required"/>
           
    <input type="submit" value="submit" name="submit">
</form>
```